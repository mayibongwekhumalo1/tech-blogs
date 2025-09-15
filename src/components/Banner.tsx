"use client"



import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <span className="text-blue-600 font-semibold">Technology</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Game Changing Virtual Reality Console Technololows</h2>
          <p className="text-gray-600 mb-4">Profit To Serve The Community</p>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>by Admin</span>
            <span className="mx-2">•</span>
            <span>27 August, 2024</span>
            <span className="mx-2">•</span>
            <span>20 Mins</span>
          </div>
          <p className="text-gray-700 mb-6">
            Browned butter and brown sugar area caramelly goodness, crispy edgesick and soft centers rare
            melty little puddles of chocolate first favorite thing about these browned butter.
          </p>
          <button className="text-blue-600 font-semibold hover:underline">Read More</button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <span className="text-green-600 font-semibold">Mobile</span>
            <h3 className="text-lg font-bold mt-1 mb-2">New Modern Iphone 14pro Max Extrea</h3>
            <p className="text-gray-600 mb-2">Revolutionary Features</p>
            <p className="text-sm text-gray-500">27 August, 2024</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <span className="text-purple-600 font-semibold">Gadget</span>
            <h3 className="text-lg font-bold mt-1 mb-2">A Guide To Image Optimization On Jamstack Sites</h3>
            <p className="text-sm text-gray-500">27 August, 2024</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <span className="text-red-600 font-semibold">News</span>
            <h3 className="text-lg font-bold mt-1 mb-2">Using Automated Test Results To Improve Accessibility</h3>
            <p className="text-sm text-gray-500">27 August, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;