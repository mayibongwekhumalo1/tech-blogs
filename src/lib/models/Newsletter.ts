import mongoose, { Document, Model } from 'mongoose';

export interface INewsletter extends Document {
  _id: string;
  email: string;
  subscribedAt: Date;
  active: boolean;
  unsubscribedAt?: Date;
}

const NewsletterSchema = new mongoose.Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
NewsletterSchema.index({ email: 1 }, { unique: true });
NewsletterSchema.index({ active: 1 });
NewsletterSchema.index({ subscribedAt: -1 });

const Newsletter: Model<INewsletter> = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;