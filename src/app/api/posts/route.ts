import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Post, { IPost } from '@/lib/models/Post';
import Category from '@/lib/models/Category';
import { FilterQuery } from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const published = searchParams.get('published') !== 'false'; // Default true
    const slug = searchParams.get('slug');

    const query: FilterQuery<IPost> = {};
    if (published) query.published = true;
    if (featured) query.featured = true;
    if (category) query.category = category;
    if (slug) query.slug = slug;

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .populate('author', 'name email image')
      .populate('category', 'name slug color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { title, content, excerpt, image, category, tags, published, featured } = body;

    // Validate required fields
    if (!title?.trim() || !content?.trim() || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Generate slug from title

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug is unique

    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: 'Post with this title already exists' },
        { status: 409 }
      );
    }

    

    const post = new Post({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt?.trim(),
      image: image?.trim(),
      author: session.user.id,
      category,
      tags: tags || [],
      published: published || false,
      featured: featured || false,
    });

    const savedPost = await post.save();
    await savedPost.populate('author', 'name email image');
    await savedPost.populate('category', 'name slug color');

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}