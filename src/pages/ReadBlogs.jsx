import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";
import Card from "../components/Card";
import { FaSearch } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    let err = null;
    let query = searchQuery.trim();
    if (!(query.length > 0)) {
      setLoading(false);
      err = "search query cannot be empty!";
      showToast(err, "");
      return;
    }
    try {
      // URL-encode the query to safely transmit special characters
      const response = await axios.get(`/search/${encodeURIComponent(query)}`);
      setBlogs(response.data);
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
        // Extract distinct tags from blogs
        const distinctTags = [
          ...new Set(response.data.map((blog) => blog.tags).flat()),
        ];
        setTags(distinctTags);
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
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen">
      <div className="flex justify-center py-8 px-4 lg:px-8">
        <form
          onSubmit={handleSearch}
          className="flex items-center mb-4 w-full lg:w-1/2 md:w-3/5"
        >
          <input
            data-tooltip-id="search"
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-l-md border border-gray-300 focus:outline-none w-full"
            style={{ height: "2.5rem" }} // Set the height of the input field
          />
          <button
            type="submit"
            className="bg-purple-600 text-white flex justify-center items-center p-2 rounded-r-md hover:bg-purple-700"
            style={{ height: "2.5rem" }} // Set the height of the button
          >
            <FaSearch />
          </button>
          <ReactTooltip
            id="search"
            place="bottom"
            variant="info"
            content="Search any keyword present in title, tags, or categories"
            style={{
              backgroundColor: "teal",
              borderRadius: "50px",
              maxWidth: "80%", // Set the default maximum width to 80% of the container
              wordWrap: "break-word", // Enable word wrapping
            }}
          />
        </form>
      </div>
      <div className="flex flex-row p-4 lg:p-8">
        <div className="text-white w-full lg:w-70">
          <h1 className="text-3xl lg:text-4xl font-bold m-2">
            Read Experiences
          </h1>
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
          <Card categories={categories} />
          <Card categories={tags} tags={true} />
        </div>
      </div>
    </div>
  );
};

export default ReadBlogs;
