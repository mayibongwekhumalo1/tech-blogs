import React from 'react';
import Image from 'next/image';

export interface OverlayCardProps {
  category: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  readTime: string;
  onClick: () => void;
  slug: string;
  image?: string;
}

const OverlayCard: React.FC<OverlayCardProps> = ({
  title,
  date,
  excerpt,
  author,
  onClick,
  image,
}) => {
  return (
    <div
      className="relative w-full h-full overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      {image && (
        <Image
          fill
          src={image}
          alt={title}
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/5 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center p-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm mb-2">{excerpt || 'No description available'}</p>
          <p className="text-xs">
            By {author || 'Unknown'} on {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverlayCard;