import React from 'react';
import { CldImage } from 'next-cloudinary';

interface PostCardProps {
  category: string;
  title: string;
  date: string;
  readTime?: string;
  author?: string;
  excerpt?: string;
  showReadMore?: boolean;
  onClick?: () => void;
  slug?: string;
  image?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  category,
  title,
  date,
  readTime,
  author,
  excerpt,
  showReadMore = false,
  onClick,
  slug,
  image
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'technology': return 'text-blue-600';
      case 'mobile': return 'text-green-600';
      case 'gadget': return 'text-purple-600';
      case 'news': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg cursor-pointer ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <span className={`font-semibold ${getCategoryColor(category)}`}>{category}</span>
      <h3 className="text-lg font-bold mt-1 mb-2">{title}</h3>
      {excerpt && <p className="text-gray-700 mb-3">{excerpt}</p>}
      <div className="flex items-center text-sm text-gray-500">
        {author && <span>by {author}</span>}
        {author && <span className="mx-2">•</span>}
        <span>{date}</span>
        {readTime && <span className="mx-2">•</span>}
        {readTime && <span>{readTime}</span>}
      </div>
      {showReadMore && (
        <button className="text-blue-600 font-semibold hover:underline mt-3">Read More</button>
      )}
    </div>
  );
};

export default PostCard;