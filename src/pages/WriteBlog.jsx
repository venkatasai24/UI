import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import { Link, useNavigate } from "react-router-dom";
import BlogWritingCard from "../components/BlogWritingCard";
import { showToast } from "../components/Toast";

const WriteBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    categories: "",
    tags: "",
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let categories =
      blog.categories.length > 0
        ? blog.categories
            .split(",")
            .map((category) => category.trim())
            .filter((category) => category.length > 0)
        : [];
    let tags =
      blog.tags.length > 0
        ? blog.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];
    const Blog = {
      ...blog,
      categories,
      tags,
    };
    let err = null;
    setLoading(true);
    try {
      await axiosPrivate.post("/", Blog);
      showToast("", "Blog created successfully!!");
      setTimeout(() => {
        navigate("/read-blogs");
      }, 2000);
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
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start text-white p-4 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-bold my-2">Write Experience</h1>
      <p className="mb-2">
        Please read our{" "}
        <Link className="text-blue-900 hover:underline" to="/guidelines">
          Guidelines
        </Link>{" "}
        page to learn how to write your experience concisely!
      </p>
      <div className="w-full lg:w-70 md:w-4/5 text-left bg-green-500 p-6 mt-2">
        {loading && (
          <p className="text-blue-500 bg-blue-100 p-2 rounded-md mb-2 text-center">
            Writing ...
          </p>
        )}
        <BlogWritingCard
          preview={preview}
          blog={blog}
          handleInputChange={handleInputChange}
          togglePreview={togglePreview}
          handleSubmitForm={handleSubmitForm}
        />
      </div>
    </div>
  );
};

export default WriteBlog;
