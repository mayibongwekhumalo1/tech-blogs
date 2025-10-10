"use client";

import Image from "next/image";

interface SlantedProps {
  title: string;
  buttonText: string;
  onButtonClick?: () => void;
  imageSrc: string;
  bgColor?: string;
  heightClassName?: string;
  titleClassName?: string;
  buttonClassName?: string;
  imageClassName?: string;
}

export default function Slanted({
  title,
  buttonText,
  onButtonClick,
  imageSrc,
  bgColor = "#07B6FF",
  heightClassName = "h-40 md:h-56",
  titleClassName = "",
  buttonClassName = "",
  imageClassName = "",
}: SlantedProps) {
  return (
    <section
      className={`relative w-full md:w-[80%] overflow-hidden flex items-center mx-auto my-10 ${heightClassName}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Slanted Shape */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-1/3 bg-black"></div>

      <div className="relative flex flex-col md:flex-row justify-between items-center w-full h-full px-6 md:px-20 py-6 md:py-0">
        {/* Left Content */}
        <div className="z-20 text-black text-center md:text-left mb-4 md:mb-0">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${titleClassName}`}>
            {title}
          </h2>
          <button
            onClick={onButtonClick}
            className={`mt-4 bg-white text-black font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full shadow-md hover:bg-gray-200 transition ${buttonClassName}`}
          >
            {buttonText}
          </button>
        </div>

        {/* Right Image */}
        <div className={`relative z-0 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-full md:-skew-x-15 origin-top-left overflow-hidden ${imageClassName} `}>
          <Image
            src={imageSrc}
            alt="VR Tech"
            fill
            className="object-cover w-full h-full rounded-md border"
          />
        </div>
      </div>
    </section>
  );
}
