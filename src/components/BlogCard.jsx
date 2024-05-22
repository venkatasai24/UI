import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogCard = ({ blog, from = "" }) => {
  let classes =
    "bg-yellow-500 text-white p-4 hover:bg-yellow-600 transition duration-300";
  if (from === "readBlogs") classes += " m-2 w-full lg:w-70 md:w-4/5";
  return (
    <Link key={blog._id} to={`/blogs/${blog._id}`} className={classes}>
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-lg">
        <ReactMarkdown
          children={blog.description.slice(0, 95) + " ..."}
          remarkPlugins={[remarkGfm]}
        />
      </p>
    </Link>
  );
};

export default BlogCard;
