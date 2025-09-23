

'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import SmallCard from '../components/SmallCard'
import OverlayCard from '../components/OverlayCard'
import { FaArrowRight ,FaArrowLeft} from "react-icons/fa6";
import { FaArrowUp } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';


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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=12&published=true&page=1');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />

        {/* Editor's Choice */}
        <div className="flex justify-between items-center mb-6 px-20 mt-2.5">
          <h2 className="text-2xl font-bold">Editor&apos;s Choice</h2>
          <div className="flex space-x-2">
            <button className="p-2    border border-gray-200 text-red-500">
              <FaArrowLeft/>
            </button>
            <button className="p-2 border border-gray-200 text-red-500">
              <FaArrowRight/>
            </button>
          </div>
        </div>

        {/* deco line */}
        <div className='w-[90%] mx-auto h-3 border-t border-b my-3 '  >
          <div className='bg-red-500 text-red-500 w-30 h-full'>.</div>
        </div>

        <div className="mb-12 mx-20 flex ">
          
            {posts.slice(0, 3).map((post) => (
              <div key={post._id} className="px-2 ">
                <SmallCard
                  category={post.category?.name || 'Uncategorized'}
                  title={post.title}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  excerpt={post.excerpt}
                  author={post.author?.name ? `by ${post.author.name}` : undefined}
                  id={post._id}
                  imageUrl={post.image}
                />
              </div>
            ))}

        </div>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          
           
           

            {/* Recent Posts */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <button className="px-2 py-0.5 border border-gray-200 flex items-center space-x-2">
                
                View All 
                
                <span className='flex flex-col ml-1.5 text-red-400 rotate-12'><FaArrowUp/> <FaArrowUp/></span>
                
                </button>
            </div>
              
               <div className='w-full h-3 border-t border-b my-3 '  >
              <div className='bg-red-500 text-red-500 w-30 h-full'>.</div>
              
               </div>
              
            <div className="space-y-1 mb-12 grid grid-rows-1 grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
              {posts.slice(3, 7).map((post, index) => (
                <div key={post._id} className={index === 0 ? 'lg:col-span-2 lg:row-span-3 mr-2 rounded-lg' : ''}>
                  {index === 0 ? (
                    <OverlayCard
                      category={post.category?.name || 'Uncategorized'}
                      title={post.title}
                      date={new Date(post.createdAt).toLocaleDateString()}
                      excerpt={post.excerpt}
                      author={post.author?.name ? `by ${post.author.name}` : undefined}
                      readTime="5 Mins"
                      id={post._id}
                      image={post.image}
                    />
                  ) : (
                    <SmallCard
                      category={post.category?.name || 'Uncategorized'}
                      title={post.title}
                      date={new Date(post.createdAt).toLocaleDateString()}
                      excerpt={post.excerpt}
                      author={post.author?.name ? `by ${post.author.name}` : undefined}
                      id={post._id}
                      imageUrl={post.image}
                    />
                  )}
                </div>
              ))}
            </div>


            {/* Ad component */}



            {/* Trending News */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Trending News</h2>
                <button className="px-2 py-0.5 border border-gray-200 flex items-center space-x-2">
                
                View All 
                
                <span className='flex flex-col ml-1.5 text-red-400 rotate-12'><FaArrowUp/> <FaArrowUp/></span>
                
                </button>
            </div>

            {/* deco */}

             <div className='w-full h-3 border-t border-b my-3 '  >
              <div className='bg-red-500 text-red-500 w-30 h-full'>.</div>
              
               </div>

               {/* post section */}

            {posts.length > 7 && (
              <Link href={`/posts/${posts[7]._id}`}>
                <div
                  className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-12 flex flex-col sm:flex-row items-center cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                {/* img div */}
                <div className="w-full sm:w-[40%] mr-0 sm:mr-6 mb-4 sm:mb-0">
                  {posts[7].image ? (
                    <CldImage
                      src={posts[7].image}
                      alt={posts[7].title}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover w-full h-32 sm:h-48"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-lg w-full h-32 sm:h-48 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* text div */}
                <div className="text-div w-full sm:w-[60%]">
                  <span className="text-blue-600 font-semibold text-sm sm:text-base">{posts[7].category?.name || 'Technology'}</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1 mb-2 leading-tight">{posts[7].title}</h3>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-4 gap-1">
                    <span>by {posts[7].author?.name || 'Admin'}</span>
                    <span className="mx-1 sm:mx-2">•</span>
                    <span>{new Date(posts[7].createdAt).toLocaleDateString()}</span>
                    <span className="mx-1 sm:mx-2">•</span>
                    <span>5 Mins</span>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
                    {posts[7].excerpt || 'Browned butter and brown sugar area caramelly goodness, crispy edges and soft centers rare melty little puddles of chocolate first favorite thing about these browned butter.'}
                  </p>
                  <Link
                    href={`/posts/${posts[7]._id}`}
                    className="px-2 py-0.5 border border-gray-200 flex items-center space-x-2 text-sm sm:text-base"
                    onClick={e => e.stopPropagation()}
                    tabIndex={-1}
                  >
                    Read More
                    <span className='flex flex-col ml-1.5 text-red-400 rotate-12'><FaArrowUp /> <FaArrowUp /></span>
                  </Link>
                </div>
              </div>
              </Link>
            )}

            {/* More Posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {posts.slice(8, 11).map((post) => (
                <Link key={post._id} href={`/posts/${post._id}`}>
                  <div
                    className=" rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    role="button"
                    tabIndex={0}
                  >
                  {post.image ? (
                    <CldImage
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={220}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-4 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-blue-600 font-semibold text-xs mb-1">{post.category?.name || 'Uncategorized'}</span>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 leading-tight line-clamp-2">{post.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author?.name ? `by ${post.author.name}` : 'by Admin'}</span>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base line-clamp-3 mb-2">{post.excerpt}</p>
                    <Link
                      href={`/posts/${post._id}`}
                      className="mt-auto text-red-500 text-xs md:text-sm font-semibold hover:underline self-start"
                      onClick={e => e.stopPropagation()}
                      tabIndex={-1}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
                </Link>
              ))}
            </div>

            {/* Weekly Best News */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Weekly Best News</h2>
              <button className="text-blue-600 font-semibold hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(11, 15).map((post) => (
                <PostCard
                  key={post._id}
                  category={post.category?.name || 'Uncategorized'}
                  title={post.title}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  id={post._id}
                  image={post.image}
                />
              ))}
            </div>
          </div>

          <div>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;