import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "My Amazing Blog Title 1",
      author: "Jordan",
      likes: 142,
      comments: 44,
    },
    {
      title: "My Amazing Blog Title 2",
      author: "John",
      likes: 153,
      comments: 25,
    },
    {
      title: "My Amazing Blog Title 4",
      author: "HuXn",
      likes: 50,
      comments: 14,
    },
  ];

  return (
    <div className="bg-white p-5 w-full md:w-[23rem] mt-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-5">
            <div className="font-bold text-base">{blog.title}</div>
            <div className="text-sm text-gray-600">
              Published by {blog.author}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ThumbsUp size={16} /> {blog.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} /> {blog.comments}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
