// components/Sidebar.tsx

"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaPinterest,FaArrowRight } from 'react-icons/fa';
import SmallCard from './SmallCard';

interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  category: { name: string; slug: string; color?: string };
  createdAt: string;
  author: { name: string; email: string; image?: string };
  excerpt?: string;
  image?: string;
  published: boolean;
  featured: boolean;
}

const Sidebar = () => {
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const icons = {
    facebook: FaFacebookF,
    twitter: FaTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    pinterest: FaPinterest,
  };
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { name: 'Mobile', slug: 'mobile', image: 'https://res.cloudinary.com/dxrv8lauy/image/upload/v1758792712/ecommerce-products/oy8dkgspsf2p99eqcmjt.jpg' },
    { name: 'Technology', slug: 'technology', image: 'https://res.cloudinary.com/dxrv8lauy/image/upload/v1758792712/ecommerce-products/oy8dkgspsf2p99eqcmjt.jpg' },
    { name: 'Gadget', slug: 'gadget', image: 'https://res.cloudinary.com/dxrv8lauy/image/upload/v1758792712/ecommerce-products/oy8dkgspsf2p99eqcmjt.jpg' },
    { name: 'News', slug: 'news', image: 'https://res.cloudinary.com/dxrv8lauy/image/upload/v1758792712/ecommerce-products/oy8dkgspsf2p99eqcmjt.jpg'},
  ];

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=3&published=true&page=1');
        const data = await response.json();
        setPopularPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };

    fetchPopularPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Network error. Please try again.');
    }
    setIsLoading(false);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6  ">
     

     
      <h3 className="text-xl font-bold mb-4">Subscribe & Followers</h3>


        <div className='w-full h-3 border-t border-b my-3 border-gray-500'  >
              <div className='bg-[#f4786b] text-[#f4786b] w-30 h-full'>.</div>
              
               </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {/* Social media icons */}
        {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'pinterest'].map((platform) => (
          <a key={platform} href="#" className="m-1 text-gray-500 px-2 py-1.5 gap-1.5 bg-[#e7f0f0] hover:text-blue-600 flex items-center">
            {(() => {
              const Icon = icons[platform as keyof typeof icons];
              return <Icon className="text-lg" />;
            })()}
            <span className="text-lg">{platform.toUpperCase()}</span>
          </a>
        ))}
      </div>


      
      <div className="mb-8 bg-blue-950 px-2.5 py-5 flex flex-col justify-center items-center text-white">
        <h4 className="font-semibold mb-2">Daily Newsletter</h4>
        <p className=" text-sm mb-4 w-[70%] text-center">Get all the top stories from Blogs to keep track.</p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4786b] bg-white text-gray-800 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-[#f4786b] hover:bg-[#e84545] text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
          {message && (
            <p className={`text-sm text-center ${message.includes('error') || message.includes('Invalid') || message.includes('already') ? 'text-red-300' : 'text-green-300'}`}>
              {message}
            </p>
          )}
        </form>
      </div>

        

        

  

      
      <div>
        <h3 className="text-xl font-bold mb-4">Hot Categories</h3>

          <div className='w-full h-3 border-t border-b border-gray-400 my-3 '  >
              <div className='bg-[#f4786b] text-[#f4786b] w-30 h-full'>.</div>
              
               </div>



     
      

        {/* hot categories */}

        <div className="space-y-4 mb-8">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <div className="relative w-full aspect-[7/2] my-2 hover:aspect-square transition-all duration-300 overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={category.image}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                  alt={category.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">{category.name}</span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-1">
                  <FaArrowRight className="text-white text-lg transform rotate-295" />
                  <FaArrowRight className="text-white text-lg transform rotate-295" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* most popular post */}
        <h3 className="text-xl font-bold mb-4">Most Popular Posts</h3>

        <div className='w-full h-3 border-t border-b border-gray-400 my-3 '  >
          <div className='bg-[#f4786b] text-[#f4786b] w-30 h-full'>.</div>
        </div>

        <div className="space-y-4 mb-8">
          {popularPosts.map((post) => (
            <SmallCard key={post._id} post={post} />
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default Sidebar;