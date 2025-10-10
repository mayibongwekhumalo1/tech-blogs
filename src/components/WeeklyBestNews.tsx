
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import SmallCard from "./SmallCard";
import Link from "next/link";

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

interface WeeklyBestNewsProps {
  posts: Post[];
}

export default function WeeklyBestNews({ posts }: WeeklyBestNewsProps) {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
          Weekly Best News
          <span className="absolute left-0 -bottom-1 w-12 h-[3px] bg-red-500 rounded-full"></span>
        </h2>
        <button className="text-sm font-semibold text-gray-700 flex items-center gap-1 hover:text-red-500 transition">
          VIEW ALL
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE - Articles */}
        <div className="lg:col-span-2 space-y-8">
          {posts.slice(0, 3).map((post, index) => {
            const colors = ["bg-red-100 text-red-600", "bg-blue-100 text-blue-600", "bg-yellow-100 text-yellow-600"];
            const color = colors[index % colors.length];
            return (
            <Link key={post._id} href={`/posts/${post._id}`}>
              <div
                className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
              {/* Left Content */}
              <div className="flex flex-col justify-between p-6 md:w-2/3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-md w-fit mb-3 ${color}`}
                >
                  {post.category?.name || 'Uncategorized'}
                </span>

                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 leading-snug">
                  {post.title}
                </h2>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>5 MINS</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  {post.excerpt || 'Browned Butter And Brown Sugar Caramelly Goodness Crispy Edgestick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.'}
                </p>

                <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                  READ MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              {/* Right Image */}
              <div className="md:w-1/3 h-48">
                <Image
                  src={post.image || '/default-image.jpg'}
                  alt={post.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
          );
          })}
        </div>

        {/* RIGHT SIDE - Sidebar */}
        <div className="space-y-8">
          {/* Ad Box */}
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dxrv8lauy/image/upload/v1757495272/01a7be37343837a37e10d2999cbd5f1e0818d926_ic2nm4.jpg"
              alt="Ad banner"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
            
          </div>

          {/* Popular Tech Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 relative">
              Popular Tech
              <span className="absolute left-0 -bottom-1 w-8 h-[2px] bg-red-500 rounded-full"></span>
            </h3>

            
            {posts[3] && (
              <SmallCard
                id={posts[3]._id}
                title={posts[3].title}
                category={posts[3].category?.name}
                date={new Date(posts[3].createdAt).toLocaleDateString()}
                imageUrl={posts[3].image}
                excerpt={posts[3].excerpt}
                author={posts[3].author?.name}
              />
            )}


             {posts[7] && (
              <SmallCard
                id={posts[7]._id}
                title={posts[7].title}
                category={posts[7].category?.name}
                date={new Date(posts[7].createdAt).toLocaleDateString()}
                imageUrl={posts[7].image}
                excerpt={posts[7].excerpt}
                author={posts[7].author?.name}
              />
            )}


             {posts[10] && (
              <SmallCard
                id={posts[10]._id}
                title={posts[10].title}
                category={posts[10].category?.name}
                date={new Date(posts[10].createdAt).toLocaleDateString()}
                imageUrl={posts[10].image}
                excerpt={posts[10].excerpt}
                author={posts[10].author?.name}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
