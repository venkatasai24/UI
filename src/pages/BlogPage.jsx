import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";
import TagAndCategory from "../components/TagAndCategory";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchBlog = async () => {
      let err = null;
      setLoading(true);
      try {
        const [blogResponse, bookmarksResponse] = await Promise.all([
          axios.get(`/${id}`),
          auth?.email
            ? axiosPrivate.get("/users/bookMarks")
            : Promise.resolve({ data: [] }),
        ]);
        setBlog(blogResponse.data);
        if (auth?.email && bookmarksResponse.data.includes(id)) {
          setIsBookmarked(true);
        }
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
  }, [id, auth?.email]);

  const handleBookmark = async () => {
    if (!auth?.email) {
      showToast("You need to login first!!", "");
      return;
    }
    let err = null;
    setLoading(true);
    try {
      if (isBookmarked) {
        await axiosPrivate.delete(`/users/bookmarks/${id}`);
        setIsBookmarked(false);
        showToast("", "unmarked successfully!!");
      } else {
        await axiosPrivate.post(`/users/bookmarks/${id}`);
        setIsBookmarked(true);
        showToast("", "Bookmarked successfully!!");
      }
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
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    {blog.title}
                  </h1>
                  {isBookmarked ? (
                    <FaBookmark
                      onClick={handleBookmark}
                      className="text-teal cursor-pointer text-xl"
                      data-tooltip-id="bookmark"
                    />
                  ) : (
                    <FaRegBookmark
                      onClick={handleBookmark}
                      className="text-teal cursor-pointer text-xl"
                      data-tooltip-id="bookmark"
                    />
                  )}
                  <ReactTooltip
                    id="bookmark"
                    place="left"
                    variant="info"
                    content={isBookmarked ? "Unmark me" : "Bookmark me"}
                    style={{
                      backgroundColor: "blue-500",
                      borderRadius: "10px",
                    }}
                  />
                </div>
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
