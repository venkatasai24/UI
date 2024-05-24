import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import TagAndCategory from "./TagAndCategory";

const BlogCard = ({ blog, from = "", handleDelete }) => {
  let classes = "bg-yellow-500 text-white p-4";
  if (from === "readBlogs") classes += " m-2 w-full";

  return (
    <div className={classes}>
      <Link key={blog._id} to={`/blogs/${blog._id}`} className="block">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="mb-2 text-sm">
          by{" "}
          <Link
            className="text-green-600 hover:underline"
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
          <Link to={`/blogs/${blog._id}/edit`}>
            <FaEdit className="text-blue-500 hover:text-blue-700" />
          </Link>
          <button onClick={(e) => handleDelete(e, blog._id)}>
            <FaTrashAlt className="text-red-500 hover:text-red-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
