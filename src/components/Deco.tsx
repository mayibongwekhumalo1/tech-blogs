
"use client";

import Image from "next/image";
import { useState } from "react";

interface DecoProps {
  title?: string;
  buttonText?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  titleClassName?: string;
  buttonClassName?: string;
  imageClassName?: string;
}

export default function Deco({
  title = "Modern Technology Fest Here",
  buttonText = "See Details",
  imageSrc = "/images/techfest.jpg",
  imageWidth = 400,
  imageHeight = 250,
  className = "",
  titleClassName = "",
  buttonClassName = "",
  imageClassName = "",
}: DecoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className={`w-full bg-cyan-400 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 rounded-lg shadow-md ${className}`}>
      {/* Left Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
        <h2 className={`text-sm md:text-lg font-bold text-gray-900 ${titleClassName}`}>
          {title.split('<br />').map((line, index) => (
            <span key={index}>
              {line}
              {index < title.split('<br />').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <button className={`bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-2 rounded-full transition-colors ${buttonClassName}`}>
          {buttonText}
        </button>
      </div>

      {/* Right Image */}
      <div className="mt-6 md:mt-0 flex justify-center w-full md:w-auto">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            className={`rounded-lg object-cover shadow-lg w-full max-w-xs h-auto ${imageClassName}`}
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className={`rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm w-full max-w-xs h-48 ${imageClassName}`}>
            Image not available
          </div>
        )}
      </div>
    </section>
  );
}

