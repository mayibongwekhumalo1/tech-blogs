"use client"
export default function StyledLine() {
  return (
    <div className="w-full flex items-center">
      {/* Left red segment */}
      <div className="w-8 h-[3px] bg-red-400 rounded-l-md shadow-sm" />

      {/* Gradient line extension */}
      <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 shadow-sm" />
    </div>
  );
}
