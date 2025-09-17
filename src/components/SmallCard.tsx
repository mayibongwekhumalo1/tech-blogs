'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MdOutlineDateRange } from "react-icons/md";

interface SmallCardProps {
  slug?: string;
  title?: string;
  category?: string;
  date?: string;
  imageUrl?: string;
  excerpt?: string; 
  post?: PostData;
  author?:string;
  onClick?: () => void;
  
}

interface PostData {
  title: string;
  category?: { name: string };
  createdAt: string;
  author?: { image?: string };
}

const SmallCard: React.FC<SmallCardProps> = ({ slug, title, category, date, imageUrl, post: providedPost, onClick }) => {
  const [fetchedPost, setFetchedPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(!providedPost);

  const post = providedPost || fetchedPost;

  useEffect(() => {
    if (providedPost) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const url = slug
          ? `/api/posts?slug=${slug}&published=true`
          : `/api/posts?published=true&limit=1&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.posts && data.posts.length > 0) {
          setFetchedPost(data.posts[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, providedPost]);

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
    <div
      className={`flex w-full max-w-[390px] h-[130px] bg-transparent my-3  transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
        {/* image holder */}
        <div className="w-[120px] bg-blue-300 flex items-center justify-center relative">
            <Image fill src={displayImage} alt={displayTitle} objectFit="cover" onError={(e) => { e.currentTarget.src = '/placeholder-image.jpg'; }} />
        </div>

        <div className="text-black px-2.5 py-1.5 space-y-2.5">
            <span className='border rounded mb-2'>{displayCategory}</span>

            <h6>
                {displayTitle}
            </h6>

            {/* date for the post */}
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