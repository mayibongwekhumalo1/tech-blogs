// components/Sidebar.tsx

"use client"
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Subscribe & Followers</h3>
      <div className="flex space-x-4 mb-6">
        {/* Social media icons */}
        {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'pinterest'].map((platform) => (
          <a key={platform} href="#" className="text-gray-600 hover:text-blue-600">
            {/* Placeholder for icons -  */}
            <span className="text-xl">{platform[0].toUpperCase()}</span>
          </a>
        ))}
      </div>
      
      <div className="mb-8">
        <h4 className="font-semibold mb-2">Daily Newsletter</h4>
        <p className="text-gray-600 text-sm mb-4">Get all the top stories from Blogs to keep track.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="E-mail" 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Submit Now
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">Hot Categories</h3>
        <div className="space-y-2">
          {['Technology', 'Mobile', 'Gadget', 'News'].map((category) => (
            <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">{category}</span>
              <span className="text-gray-500">(12)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;