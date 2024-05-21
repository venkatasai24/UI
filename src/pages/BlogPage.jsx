import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start text-white p-4 lg:p-8">
      <div className="w-full lg:w-70 md:w-4/5 text-left bg-yellow-500 p-6">
        {loading ? (
          <SkeletonTheme baseColor="rgb(34 197 94)" highlightColor="#ffffff">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <Skeleton width="70%" />
            </h1>
            <p className="text-lg mb-4 whitespace-pre-line">
              <Skeleton count={5} />
            </p>
            <p className="text-sm mt-4 font-bold">
              <Skeleton width="30%" />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {blog.title}
            </h1>
            <p className="text-lg mb-4 whitespace-pre-line">
              <ReactMarkdown
                children={blog.description}
                remarkPlugins={[remarkGfm]}
              />
            </p>
            <p className="text-sm mt-4 font-bold">
              Created by: {blog.createdBy}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
