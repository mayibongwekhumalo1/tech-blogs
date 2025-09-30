import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  category: string;
  title: string;
  date: string;
  readTime?: string;
  author?: string;
  excerpt?: string;
  showReadMore?: boolean;
  onClick?: () => void;
  id?: string;
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
  id,
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

  const content = (
    <>
      {image && (
        <div className="mb-3">
          <Image
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full h-32 sm:h-40 object-cover rounded-lg"
          />
        </div>
      )}
      <span className={`font-semibold text-sm sm:text-base ${getCategoryColor(category)}`}>{category}</span>
      <h3 className="text-base sm:text-lg md:text-xl font-bold mt-1 mb-2 leading-tight">{title}</h3>
      {excerpt && <p className="text-gray-700 mb-3 text-sm sm:text-base leading-relaxed">{excerpt}</p>}
      <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-1">
        {author && <span>by {author}</span>}
        {author && <span className="mx-1 sm:mx-2">•</span>}
        <span>{date}</span>
        {readTime && <span className="mx-1 sm:mx-2">•</span>}
        {readTime && <span>{readTime}</span>}
      </div>
      {showReadMore && (
        <button className="text-blue-600 font-semibold hover:underline mt-3 text-sm sm:text-base">Read More</button>
      )}
    </>
  );

  if (id) {
    return (
      <Link href={`/posts/${id}`}>
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 transition-all duration-300 hover:shadow-lg cursor-pointer">
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 transition-all duration-300 hover:shadow-lg ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default PostCard;