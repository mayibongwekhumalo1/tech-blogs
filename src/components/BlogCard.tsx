"use client"


import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  category: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function BlogCard({ category, title, date, readTime, description, imageSrc, imageAlt }: BlogCardProps) {
  return (
    <section className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow">
      {/* Left Content */}
      <div className="flex flex-col justify-between p-4 md:w-2/3">
        {/* Category */}
        <span className="text-xs font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-md w-fit mb-2">
          {category}
        </span>

        {/* Title */}
        <h2 className="text-sm md:text-base font-semibold text-gray-800 mb-2 leading-snug">
          {title}
        </h2>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-gray-500 text-xs mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-4">
          {description}
        </p>

        {/* Button */}
        <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
          READ MORE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/3 h-full m-4">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
