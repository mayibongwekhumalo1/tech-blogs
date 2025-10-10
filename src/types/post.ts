export interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  category: { name: string; slug: string; color?: string };
  createdAt: string;
  author: { name: string; email: string; image?: string };
  excerpt?: string;
  image?: string;
  published: boolean;
  featured: boolean;
}