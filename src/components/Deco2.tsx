
"use client"

import Image from "next/image";

interface ProductBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function ProductBanner({
  title,
  description,
  imageUrl,
  buttonText = "SHOP ONLINE",
  buttonLink = "#",
}: ProductBannerProps) {
  return (
    <section className="w-full md:max-w-5xl mx-auto min-h-[200px] my-10 bg-green-200 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 rounded-lg shadow-md">
      {/* Left Image */}
      <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="object-cover w-32 h-32 md:w-40 md:h-40 rounded-full"
        />
      </div>

      {/* Center Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-3 mx-3.5">
        <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* Right Button */}
      <div className="md:w-1/6 flex justify-center md:justify-end mt-6 md:mt-0">
        <a
          href={buttonLink}
          className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 px-5 py-2 rounded-md shadow-sm transition inline-flex items-center gap-2"
        >
          {buttonText} <span className="text-md">↗</span>
        </a>
      </div>
    </section>
  );
}
