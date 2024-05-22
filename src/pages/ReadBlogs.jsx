import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BlogCard from "../components/BlogCard";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("/");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const skeletons = Array(5).fill();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start p-4 lg:p-8">
      <div className="text-white">
        <h1 className="text-3xl lg:text-4xl font-bold m-2">Read Experiences</h1>
        <div className="flex flex-wrap justify-start">
          {loading
            ? skeletons.map((_, index) => (
                <div
                  key={index}
                  className="bg-yellow-500 text-white p-4 m-2 w-full lg:w-70 md:w-4/5 hover:bg-yellow-600 transition duration-300"
                >
                  <SkeletonTheme
                    baseColor="rgb(34 197 94)"
                    highlightColor="#ffffff"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      <Skeleton width="30%" />
                    </h2>
                    <p className="text-lg">
                      <Skeleton count={1} />
                    </p>
                  </SkeletonTheme>
                </div>
              ))
            : blogs.map((blog) => <BlogCard blog={blog} from="readBlogs" />)}
        </div>
      </div>
    </div>
  );
};

export default ReadBlogs;
