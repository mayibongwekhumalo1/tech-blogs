'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { MdOutlineDateRange } from "react-icons/md";

interface SmallCardProps {
  id?: string;
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

const SmallCard: React.FC<SmallCardProps> = ({ id, title, category, date, imageUrl, post: providedPost, onClick }) => {
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
        const url = id
          ? `/api/posts/${id}`
          : `/api/posts?published=true&limit=1&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (id ? data : data.posts && data.posts.length > 0) {
          setFetchedPost(id ? data : data.posts[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, providedPost]);

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

  const content = (
    <>
      {/* image holder */}
      <div className="w-24 sm:w-28 md:w-32 bg-blue-300 flex items-center justify-center relative flex-shrink-0">
          <CldImage fill src={displayImage} alt={displayTitle} className="object-cover rounded" />
      </div>

      <div className="text-black px-2.5 py-1.5 space-y-2.5 flex-1">
          <span className='border rounded mb-2 inline-block text-xs sm:text-sm px-2 py-1'>{displayCategory}</span>

          <h6 className="text-sm sm:text-base md:text-lg font-semibold leading-tight">
              {displayTitle}
          </h6>

          {/* date for the post */}
          <div className="flex space-x-2.5 items-center text-xs sm:text-sm">
              {/* date icon */}
              <MdOutlineDateRange className="w-4 h-4" />
              {/* date */}
              <span>
                  {displayDate}
              </span>
          </div>
      </div>
    </>
  );

  if (id) {
    return (
      <Link href={`/posts/${id}`}>
        <div className="flex w-full max-w-sm sm:max-w-md md:max-w-lg h-auto min-h-[130px] bg-transparent my-3 transition-all duration-300 hover:shadow-lg cursor-pointer">
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`flex w-full max-w-sm sm:max-w-md md:max-w-lg h-auto min-h-[130px] bg-transparent my-3 transition-all duration-300 hover:shadow-lg ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default SmallCard;