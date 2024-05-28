import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import TagAndCategory from "./TagAndCategory";

const BlogCard = ({ blog, from = "", handleDelete }) => {
  const location = useLocation();
  let classes = "bg-white bg-opacity-30 p-4 rounded-lg shadow-lg";
  if (from === "readBlogs") classes += " m-2 w-full";

  return (
    <div className={classes}>
      <Link key={blog._id} to={`/blogs/${blog._id}`} className="block">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="mb-2 text-sm">
          by{" "}
          <Link
            className="text-red-600 hover:underline"
            to={`/view-profile/${blog.createdBy}`}
          >
            {blog.createdBy}
          </Link>
          , {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg">
          <ReactMarkdown
            children={blog.description.slice(0, 100) + " ..."}
            remarkPlugins={[remarkGfm]}
          />
        </p>
        <TagAndCategory blog={blog} />
      </Link>
      {from === "Profile" && (
        <div className="flex justify-end space-x-4 mt-4">
          <Link state={{ from: location }} to={`/blogs/${blog._id}/edit`}>
            <FaEdit className="text-blue-700 hover:text-blue-800" />
          </Link>
          <button onClick={(e) => handleDelete(e, blog._id, blog.createdBy)}>
            <FaTrashAlt className="text-red-600 hover:text-red-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
