// components/Sidebar.tsx

"use client"
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky">
      <h3 className="text-xl font-bold mb-4">Subscribe & Followers</h3>


        <div className='w-full h-3 border-t border-b my-3 border-gray-500'  >
              <div className='bg-[#f4786b] text-[#f4786b] w-30 h-full'>.</div>
              
               </div>

      <div className="grid grid-cols-2 grid-row-3 space-x-4 mb-6">
        {/* Social media icons */}
        {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'pinterest'].map((platform) => (
          <a key={platform} href="#" className="m-1 text-gray-500 px-2 py-1.5 gap-1.5 bg-[#e7f0f0] hover:text-blue-600 ">
            {/* Placeholder for icons -  */}


            <span className="text-lg">{platform.toUpperCase()}</span>
          </a>
        ))}
      </div>


      
      <div className="mb-8 bg-blue-950 px-2.5 py-5 flex flex-col justify-center items-center text-white">
        <h4 className="font-semibold mb-2">Daily Newsletter</h4>
        <p className=" text-sm mb-4 w-[70%] text-center">Get all the top stories from Blogs to keep track.</p>
        <div className="flex items-center bg-[#f4786b] text-white">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className=" px-4 py-2  rounded-l-md focus:outline-none "
          />
          
        </div>
      </div>


      
      <div>
        <h3 className="text-xl font-bold mb-4">Hot Categories</h3>

          <div className='w-full h-3 border-t border-b border-gray-400 my-3 '  >
              <div className='bg-[#f4786b] text-[#f4786b] w-30 h-full'>.</div>
              
               </div>

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