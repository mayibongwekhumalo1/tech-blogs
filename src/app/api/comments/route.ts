import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import connectToDatabase from '@/lib/mongodb';
import Comment from '@/lib/models/Comment';
import Post from '@/lib/models/Post';

interface CommentQuery {
  post: string;
  approved: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query: any = { approved: true };

    if (postId) {
      // Check if post exists
      const post = await Post.findById(postId);
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
      query.post = postId;
    } else {
      // If no postId, only allow admin to fetch all comments
      if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      // Admin can see all comments, including unapproved
      query = {};
    }

    const skip = (page - 1) * limit;

    const comments = await Comment.find(query)
      .populate('author', 'name email image')
      .populate('post', 'title')
      .populate({
        path: 'parent',
        populate: { path: 'author', select: 'name' }
      })
      .sort({ createdAt: -1 }) // Newest first for admin
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Comment.countDocuments(query);

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/comments error:', error);
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
    const { content, postId, parentId } = body;

    if (!content?.trim() || !postId) {
      return NextResponse.json(
        { error: 'Content and post ID are required' },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // If parentId provided, check if parent comment exists
    
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }

    const comment = new Comment({
      content: content.trim(),
      author: session.user.id,
      post: postId,
      parent: parentId || null,
    });

    const savedComment = await comment.save();
    await savedComment.populate('author', 'name email image');

    return NextResponse.json(savedComment, { status: 201 });
  } catch (error) {
    console.error('POST /api/comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}