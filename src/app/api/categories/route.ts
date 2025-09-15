import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Category from '@/lib/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Check if categories exist, if not, seed some default ones
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const defaultCategories = [
        { name: 'Technology', slug: 'technology', description: 'Tech news and updates', color: '#3B82F6' },
        { name: 'Web Development', slug: 'web-development', description: 'Frontend and backend development', color: '#10B981' },
        { name: 'Mobile Development', slug: 'mobile-development', description: 'iOS and Android development', color: '#F59E0B' },
        { name: 'Data Science', slug: 'data-science', description: 'Data analysis and machine learning', color: '#EF4444' },
        { name: 'Design', slug: 'design', description: 'UI/UX and graphic design', color: '#8B5CF6' },
        { name: 'Business', slug: 'business', description: 'Business and entrepreneurship', color: '#06B6D4' },
        { name: 'Tutorial', slug: 'tutorial', description: 'How-to guides and tutorials', color: '#84CC16' },
        { name: 'News', slug: 'news', description: 'Industry news and updates', color: '#F97316' }
      ];

      await Category.insertMany(defaultCategories);
      console.log('Default categories seeded successfully');
    }

    const categories = await Category.find({}).sort({ name: 1 }).lean();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('GET /api/categories error:', error);
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
    const { name, description, color } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug is unique
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 }
      );
    }

    const category = new Category({
      name: name.trim(),
      slug,
      description: description?.trim(),
      color: color || '#3B82F6',
    });

    const savedCategory = await category.save();

    return NextResponse.json(savedCategory, { status: 201 });
  } catch (error) {
    console.error('POST /api/categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}