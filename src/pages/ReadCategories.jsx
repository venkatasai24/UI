import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";
import { useParams } from "react-router-dom";

const ReadCategories = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const getTagBlogs = async () => {
      let err = null;
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.get(`/categories/${category}`);
        setBlogs(response.data);
        console.log(response.data);
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
    getTagBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start p-4 lg:p-8">
      <div className="text-white w-full lg:w-70">
        <h1 className="text-3xl lg:text-4xl m-2">
          Experiences related to <strong>{category}</strong>
        </h1>
        <div className="flex flex-wrap justify-start">
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-30 rounded-lg shadow-lg p-4 m-2 w-full"
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

export default ReadCategories;
