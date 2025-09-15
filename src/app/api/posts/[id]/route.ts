import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import Category from '@/lib/models/Category';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { id } = await params;
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user is admin or the author of the post
    const isAdmin = session.user.role === 'admin';
    const isAuthor = post.author.toString() === session.user.id;

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own posts' },
        { status: 403 }
      );
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { id } = await params;
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user is admin or the author of the post
    const isAdmin = session.user.role === 'admin';
    const isAuthor = post.author.toString() === session.user.id;

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Forbidden: You can only update your own posts' },
        { status: 403 }
      );
    }

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

    // Generate slug from title if title changed
    let slug = post.slug;
    if (title.trim() !== post.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if slug is unique (excluding current post)
      const existingPost = await Post.findOne({ slug, _id: { $ne: id } });
      if (existingPost) {
        return NextResponse.json(
          { error: 'Post with this title already exists' },
          { status: 409 }
        );
      }
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        slug,
        content: content.trim(),
        excerpt: excerpt?.trim(),
        image: image?.trim(),
        category,
        tags: tags || [],
        published: published !== undefined ? published : post.published,
        featured: featured !== undefined ? featured : post.featured,
      },
      { new: true }
    ).populate('author', 'name email image').populate('category', 'name slug color');

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('PUT /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}