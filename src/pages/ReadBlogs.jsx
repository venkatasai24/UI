import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      let err = null;
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.get("/");
        setBlogs(response.data);
      } catch (error) {
        if (error?.response?.data?.message) err = error.response.data.message;
        else err = error.message;
      } finally {
        setLoading(false);
        if (err) {
          showToast(err, "");
        }
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start p-4 lg:p-8">
      <div className="text-white">
        <h1 className="text-3xl lg:text-4xl font-bold m-2">Read Experiences</h1>
        <div className="flex flex-wrap justify-start">
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-yellow-500 p-4 m-2 w-full lg:w-70 md:w-4/5"
                  >
                    <SkeletonBlog from="ReadBlogs" />
                  </div>
                ))
            : blogs.map((blog) => <BlogCard blog={blog} from="readBlogs" />)}
        </div>
      </div>
    </div>
  );
};

export default ReadBlogs;
