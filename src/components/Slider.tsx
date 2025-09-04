import Slider from 'react-slick';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: { name: string };
  category: { name: string; color: string };
  createdAt: string;
}

interface PostSliderProps {
  posts: Post[];
}

export default function PostSlider({ posts }: PostSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {posts.map((post) => (
        <div key={post._id} className="p-6">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <span
                className="px-2 py-1 text-xs font-semibold rounded"
                style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
              >
                {post.category.name}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {post.author.name}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </article>
        </div>
      ))}
    </Slider>
  );
}