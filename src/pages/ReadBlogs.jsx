import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";
import CategoriesCard from "../components/CategoriesCard";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      let err = null;
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.get("/");
        setBlogs(response.data);
        // Extract distinct categories from blogs
        const distinctCategories = [
          ...new Set(response.data.map((blog) => blog.categories).flat()),
        ];
        setCategories(distinctCategories);
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
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-row p-4 lg:p-8">
      <div className="text-white w-full lg:w-70">
        <h1 className="text-3xl lg:text-4xl font-bold m-2">Read Experiences</h1>
        <div className="flex flex-wrap justify-start">
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg m-2 w-full"
                  >
                    <SkeletonBlog from="ReadBlogs" />
                  </div>
                ))
            : blogs.map((blog) => <BlogCard blog={blog} from="readBlogs" />)}
        </div>
      </div>
      <div className="hidden lg:block lg:w-30">
        <CategoriesCard categories={categories} />
      </div>
    </div>
  );
};

export default ReadBlogs;
