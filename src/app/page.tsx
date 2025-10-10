

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { FaArrowUp } from 'react-icons/fa';
import Banner from '@/components/Banner';
import Sidebar from '@/components/Sidebar';
import SmallCard from '@/components/SmallCard';
import OverlayCard from '@/components/OverlayCard';
import Slanted from '@/components/Slanted';
import Deco2 from '@/components/Deco2';
import WeeklyBestNews from '@/components/WeeklyBestNews';
import NewsletterBar from '@/components/NewsletterBar';
import { Post } from '@/types/post';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const recentPostsRef = useRef<HTMLDivElement>(null);

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

    const handleScroll = () => {
        if (window.scrollY >= sidebarTop - window.innerHeight / 2) {
          setIsSidebarVisible(true);
        } else {
          setIsSidebarVisible(false);
        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarTop]);

  useEffect(() => {
    if (posts.length > 0 && recentPostsRef.current) {
      const rect = recentPostsRef.current.getBoundingClientRect();
      setSidebarTop(rect.top + window.scrollY);
    }
  }, [posts]);


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


      {/* deco */}

      <div className=" ">
        
       <Slanted
         title="Modern Technology Fest Here"
         buttonText="See Details"
         imageSrc="https://res.cloudinary.com/dxrv8lauy/image/upload/v1758800630/ecommerce-products/tzlic8ttx5jlvyib736y.jpg"
       />
      </div>
       
        {/* Editor's Choice */}
        <div className="flex justify-between items-center mb-6 px-4 md:px-20 mt-2.5">
          <h2 className="text-2xl font-bold">Editor&apos;s Choice</h2>
          <div className="flex space-x-2 md:hidden">
            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, posts.length - 1)))} className="p-2    border border-gray-200 text-red-500">
              <FaArrowLeft/>
            </button>
            <button onClick={() => setCurrentIndex((prev) => (prev < Math.max(0, posts.length - 1) ? prev + 1 : 0))} className="p-2 border border-gray-200 text-red-500">
              <FaArrowRight/>
            </button>
          </div>
        </div>

       

          

        {/* deco line */}
        <div className='w-[90%] mx-auto h-3 border-t border-b my-3 '  >
          <div className='bg-red-500 text-red-500 w-30 h-full'>.</div>
          <span className='bg-transparent skew-12'></span>
        </div>

        {/* Desktop version */}
        <div className="hidden md:block mb-12 mx-4 md:mx-20">
          <div className="flex">
            {posts.slice(0, 3).map((post) => {
              return (
              <div key={post._id} className="px-2">
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
            )
          })}
          </div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden mb-12 mx-4 md:mx-20">
          <div className="flex justify-center">
            <SmallCard
              category={posts[currentIndex]?.category?.name || 'Uncategorized'}
              title={posts[currentIndex]?.title || ''}
              date={posts[currentIndex] ? new Date(posts[currentIndex].createdAt).toLocaleDateString() : ''}
              excerpt={posts[currentIndex]?.excerpt}
              author={posts[currentIndex]?.author?.name ? `by ${posts[currentIndex].author.name}` : undefined}
              id={posts[currentIndex]?._id || ''}
              imageUrl={posts[currentIndex]?.image}
            />
          </div>
        </div>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          
           
           

            {/* Recent Posts */}
            <div id="recent-posts" ref={recentPostsRef} className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <button className="px-2 py-0.5 border border-gray-200 flex items-center space-x-2">
                
                View All 
                
                <span className='flex flex-col ml-1.5 text-red-400 rotate-12'><FaArrowUp/> <FaArrowUp/></span>
                
                </button>
            </div>
              
               <div className='w-full h-3 border-t border-b my-3 '  >
              <div className='bg-red-500 text-red-500 w-30 h-full'>.</div>
              
               </div>




              
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {posts.slice(3, 7).map((post, index) => {
               return (
                <div key={post._id} className={index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-3 rounded-lg' : ''}>
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
              )
            })}
            </div>


            {/* Ad component */}
            <div className=" ">
        
       <Slanted
         title="Modern Technology Fest Here"
         imageClassName='w-full  h-full'
         titleClassName='text-sm lg:-ml-15 font-light'
         buttonClassName='p-0 text-sm'
         buttonText="See Details"
         imageSrc="https://res.cloudinary.com/dxrv8lauy/image/upload/v1758800630/ecommerce-products/tzlic8ttx5jlvyib736y.jpg"
       />
      </div>

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
                    <Image
                      src={posts[7].image}
                      alt={posts[7].title}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover w-full h-32 sm:h-48"
                      sizes="(max-width: 640px) 100vw, 40vw"
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
                    {posts[7].excerpt || 'Browned butter and brown sugar are caramelly goodness, crispy edges and soft centers rare melty little puddles of chocolate first favorite thing about these browned butter.'}
                  </p>
                  <span className="px-2 py-0.5 border border-gray-200 flex items-center space-x-2 text-sm sm:text-base text-center md:w-40">
                    Read More
                    <span className='flex flex-col ml-1.5 text-red-400 rotate-12'><FaArrowUp /> <FaArrowUp /></span>
                  </span>
                </div>
              </div>
              </Link>
            )}


            {/* More Posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             {posts.slice(8, 11).map((post) => {
               return (
                <Link key={post._id} href={`/posts/${post._id}`}>
                  <div
                    className="rounded-lg  overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    role="button"
                    tabIndex={0}
                  >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={220}
                      className="w-full h-48 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-blue-600 font-semibold text-xs mb-1">{post.category?.name || 'Uncategorized'}</span>
                    <h3 className="text-base md:text-lg lg:text-md font-bold mb-2 leading-tight line-clamp-2">{post.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author?.name ? `by ${post.author.name}` : 'by Admin'}</span>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base line-clamp-3 mb-2">{post.excerpt}</p>
                    <span className="mt-auto text-red-500 text-xs md:text-sm font-semibold hover:underline self-start">
                      Read More
                    </span>
                  </div>
                </div>
                </Link>
              )
            })}
            </div>



            {/* Weekly Best News */}
            
          </div>

          {isSidebarVisible && (
            <div>
              <Sidebar />
            </div>
          )}

        
        </div>
      </main>

      <Deco2
      
       title="iPhone 14 Pro Max 2023"
      description="Browned Butter And Brown Sugar Caramel Goodness. Crispy Edges Thick And Soft Centers."
      imageUrl="https://res.cloudinary.com/dxrv8lauy/image/upload/v1757495271/ff08179abf1c2ee07082329978ff667633dc0cf4_fz1ayc.jpg"
      buttonText="SHOP ONLINE"
      buttonLink="#"

      />



      {/* overlayed grid */}

      <section className="overlayed w-full px-2 sm:px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.slice(0, 4).map((post) => (
            <div key={post._id} className="h-52 sm:h-64 md:h-72 lg:h-80">
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
            </div>
          ))}
        </div>
      </section>



      
{/* weeklly best news */}

        <WeeklyBestNews posts={posts} />


        {/* news latter */}

      

        <NewsletterBar/>

    </div>
  );
};

export default Home;