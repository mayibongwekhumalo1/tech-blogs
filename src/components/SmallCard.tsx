'use client'

import React, { useState, useEffect } from 'react'
import { MdOutlineDateRange } from "react-icons/md";

interface SmallCardProps {
  slug?: string;
  title?: string;
  category?: string;
  date?: string;
  imageUrl?: string;
}

interface PostData {
  title: string;
  category?: { name: string };
  createdAt: string;
  author?: { image?: string };
}

const SmallCard: React.FC<SmallCardProps> = ({ slug, title, category, date, imageUrl }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = slug
          ? `/api/posts?slug=${slug}&published=true`
          : `/api/posts?published=true&limit=1&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.posts && data.posts.length > 0) {
          setPost(data.posts[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="flex w-[270px] h-[100px] bg-transparent my-3">Loading...</div>;
  }

  if (!post) {
    return <div className="flex w-[270px] h-[100px] bg-transparent my-3">Post not found</div>;
  }

  const displayTitle = title || post.title;
  const displayCategory = category || post.category?.name || 'Uncategorized';
  const displayDate = date || new Date(post.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const displayImage = imageUrl || post.author?.image || '/placeholder-image.jpg';

  return (
    <div className="flex w-full max-w-[270px] h-[100px] bg-transparent my-3">
        {/* image holder */}
        <div className="w-[120px] bg-blue-300 flex items-center justify-center">
            <img src={displayImage} alt={displayTitle} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder-image.jpg'; }} />
        </div>

        <div className="text-black px-2.5 py-1.5 space-y-2.5">
            <span className='border rounded mb-1'>{displayCategory}</span>

            <h6>
                {displayTitle}
            </h6>

            {/* dae for the post */}
            <div className="flex space-x-2.5 items-center">
                {/* date icon */}
                <MdOutlineDateRange />
                {/* date */}
                <span>
                    {displayDate}
                </span>
            </div>
        </div>
    </div>
  );
};

export default SmallCard;