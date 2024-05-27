import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";
import TagAndCategory from "../components/TagAndCategory";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      let err = null;
      setLoading(true);
      try {
        const response = await axios.get(`/${id}`);
        setBlog(response.data);
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

    fetchBlog();
  }, [id]);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start text-white p-4 lg:p-8">
        {loading ? (
          <>
            <div className="w-full lg:w-70 md:w-4/5 text-left bg-white bg-opacity-30 rounded-lg shadow-lg p-6">
              <SkeletonBlog />
            </div>
          </>
        ) : (
          blog && (
            <>
              <div className="w-full lg:w-70 md:w-4/5 text-left bg-white bg-opacity-30 rounded-lg shadow-lg p-6">
                <h1 className="text-3xl lg:text-4xl font-bold">{blog.title}</h1>
                <p className="text-sm mb-4">
                  by{" "}
                  <Link
                    className="text-red-600 hover:underline"
                    to={`/view-profile/${blog.createdBy}`}
                  >
                    {" "}
                    {blog.createdBy}
                  </Link>{" "}
                  , {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg whitespace-pre-line">
                  <ReactMarkdown
                    children={blog.description}
                    remarkPlugins={[remarkGfm]}
                  />
                </p>
                <TagAndCategory blog={blog} />
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default BlogPage;
