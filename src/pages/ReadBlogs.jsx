import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import SkeletonBlog from "../components/SkeletonBlog";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      setError("");
      try {
        const response = await axios.get("/");
        setBlogs(response.data);
      } catch (error) {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
        else setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start p-4 lg:p-8">
      <div className="text-white">
        <h1 className="text-3xl lg:text-4xl font-bold m-2">Read Experiences</h1>
        <div className="flex flex-wrap justify-start">
          {error ? (
            <p className="text-red-500 bg-red-100 p-2 rounded-md m-2 text-center">
              {error}
            </p>
          ) : (
            <>
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
                : blogs.map((blog) => (
                    <BlogCard blog={blog} from="readBlogs" />
                  ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadBlogs;
