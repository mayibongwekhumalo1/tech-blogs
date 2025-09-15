'use client'

import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import SmallCard from '@/components/SmallCard';
import Sidebar from '@/components/Sidebar'


interface Post {
  slug: string;
  title: string;
  category?: { name: string };
  createdAt: string;
  author?: { image?: string };
}



export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=3&published=true&page=1');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  return <main className="border-gray-50 w-screen overflow-x-hidden px-20 flex flex-col items-center"> 
  
  
   <Banner />

   <div className="my-10 bg-blue-500 flex mx-auto w-[70%]">

    <div className="flex px-auto items-center px-3.5">
      <h2>
        Modern Technology  <br />Fest Here
      </h2>

      <button
      
      className='rounded-xl bg-accent w-30 text-sm mx-3 py-2 px-2.5 h-10'
      
      >See Details</button>
    </div>

   </div>

{/*  */}

    <div className="flex justify-between items-cent">
      <h1>
        Editor choice
      </h1>
     {posts.slice(0, 3).map((post) => (
       <SmallCard key={post.slug} slug={post.slug} />
     ))}

    </div>


    {/* blogs section  */}

    <section className="flex  h-[800px] w-full border-3 items-center  border-amber-500 mx-20">
      {/* main  */}
      <div className="border-2 border-black h-full w-2/3">

        <h1>
          main
        </h1>
      </div>
      {/* sidebar */}


      <Sidebar/>

    </section>

  
  
   </main>;
}
