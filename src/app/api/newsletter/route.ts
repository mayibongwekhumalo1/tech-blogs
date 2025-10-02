import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Newsletter from '@/lib/models/Newsletter';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.active) {
        return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
      } else {
        // Reactivate
        existing.active = true;
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = undefined;
        await existing.save();
        return NextResponse.json({ message: 'Successfully resubscribed!' });
      }
    }

    // Create new subscription
    const newSubscription = new Newsletter({ email: email.toLowerCase() });
    await newSubscription.save();

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}