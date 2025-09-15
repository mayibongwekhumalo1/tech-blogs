export const samplePosts = [
  {
    title: "Using Automated Test Results To Improve",
    slug: "using-automated-test-results-to-improve",
    content: "Detailed content about automated testing...",
    excerpt: "Learn how to leverage automated test results to enhance your development process.",
    image: "/images/test-automation.jpg",
    author: "507f1f77bcf86cd799439011", // Dummy ObjectId for admin user
    category: "507f1f77bcf86cd799439012", // Dummy ObjectId for Mobile category
    tags: ["testing", "automation", "development"],
    published: true,
    featured: true,
  },
  {
    title: "How To Search For A Developer Job Abroad",
    slug: "how-to-search-for-developer-job-abroad",
    content: "Comprehensive guide on finding developer jobs internationally...",
    excerpt: "Step-by-step guide to landing your dream developer job in another country.",
    image: "/images/job-search.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439013", // Gadget category
    tags: ["career", "jobs", "international"],
    published: true,
    featured: false,
  },
  {
    title: "New Smashing Front-End & UX Workshops",
    slug: "new-smashing-front-end-ux-workshops",
    content: "Announcing new workshops on front-end development and UX design...",
    excerpt: "Exciting new workshops covering the latest in front-end and UX technologies.",
    image: "/images/workshops.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439014", // Technology category
    tags: ["workshops", "front-end", "ux"],
    published: true,
    featured: true,
  },
  {
    title: "Best Tech Accessor 10 Work From Home Essentials",
    slug: "best-tech-accessories-work-from-home-essentials",
    content: "Top 10 essential tech accessories for working from home...",
    excerpt: "Discover the must-have tech accessories that make remote work more productive.",
    image: "/images/wfh-essentials.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439015", // News category
    tags: ["remote work", "accessories", "productivity"],
    published: true,
    featured: false,
  },
  {
    title: "World Needs to Better Reflect People of Color",
    slug: "world-needs-better-reflect-people-of-color",
    content: "Discussion on diversity and inclusion in technology...",
    excerpt: "Why the tech industry needs to better represent and include people of color.",
    image: "/images/diversity.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439013",
    tags: ["diversity", "inclusion", "technology"],
    published: true,
    featured: false,
  },
  {
    title: "How To Create Advanced Animations With CSS",
    slug: "how-to-create-advanced-animations-with-css",
    content: "Master advanced CSS animations techniques...",
    excerpt: "Learn advanced techniques for creating stunning animations with pure CSS.",
    image: "/images/css-animations.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439014",
    tags: ["css", "animations", "front-end"],
    published: true,
    featured: true,
  },
  {
    title: "Influence The Future Of CSS",
    slug: "influence-future-of-css",
    content: "How developers can influence the evolution of CSS...",
    excerpt: "Your role in shaping the future of CSS and web standards.",
    image: "/images/css-future.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439013",
    tags: ["css", "standards", "future"],
    published: true,
    featured: false,
  },
  {
    title: "The Butter Chocolate Cookies Daily",
    slug: "butter-chocolate-cookies-daily",
    content: "Recipe and story about butter chocolate cookies...",
    excerpt: "A daily delight: the perfect butter chocolate cookie recipe.",
    image: "/images/cookies.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439014",
    tags: ["recipe", "cookies", "food"],
    published: true,
    featured: false,
  },
  {
    title: "Iphone Devices Are Going To Incredible Now a days",
    slug: "iphone-devices-incredible-nowadays",
    content: "Latest developments in iPhone technology...",
    excerpt: "Exploring why iPhone devices are more incredible than ever.",
    image: "/images/iphone.jpg",
    author: "507f1f77bcf86cd799439011",
    category: "507f1f77bcf86cd799439012",
    tags: ["iphone", "apple", "mobile"],
    published: true,
    featured: true,
  },
];

// To insert into database, you can use this in a script:
// import { samplePosts } from './samplePosts';
// import Post from './models/Post';
// import connectToDatabase from './mongodb';
//
// connectToDatabase().then(async () => {
//   for (const postData of samplePosts) {
//     const post = new Post(postData);
//     await post.save();
//   }
//   console.log('Sample posts inserted');
// });