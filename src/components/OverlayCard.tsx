import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface OverlayCardProps {
  category: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  readTime: string;
  onClick?: () => void;
  id: string;
  image?: string;
}

const OverlayCard: React.FC<OverlayCardProps> = ({
  title,
  date,
  onClick,
  id,
  image,
}) => {
  const content = (
    <div className="relative w-full h-full overflow-hidden cursor-pointer">
      {image && (
        <Image
          fill
          src={image}
          alt={title}
          className="object-cover"
          sizes="100vw"
        />
      )}
      {/* Always visible title */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 md:p-4">
        <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
        <p className="text-white text-sm md:text-base">{date}</p>
      </div>
    </div>
  );

  if (id) {
    return (
      <Link href={`/posts/${id}`}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      {content}
    </div>
  );
};

export default OverlayCard;