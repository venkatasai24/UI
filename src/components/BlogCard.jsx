import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BlogCard = ({ blog, from = "", handleDelete }) => {
  let classes = "bg-yellow-500 text-white p-4";
  if (from === "readBlogs") classes += " m-2 w-full lg:w-70 md:w-4/5";

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
            {" "}
            {blog.createdBy}
          </Link>{" "}
          , {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg">
          <ReactMarkdown
            children={blog.description.slice(0, 100) + " ..."}
            remarkPlugins={[remarkGfm]}
          />
        </p>
      </Link>
      {from === "Profile" && (
        <div className="flex justify-end space-x-4 mt-4">
          <Link
            to={`/blogs/${blog._id}/edit`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline"
          >
            <FaEdit />
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline"
            onClick={(e) => handleDelete(e, blog._id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
