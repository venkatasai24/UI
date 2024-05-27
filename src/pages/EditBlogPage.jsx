import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogWritingCard from "../components/BlogWritingCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    categories: "",
    tags: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!from || from !== "/profile") {
      showToast(
        "You can't edit this blog. Please access the profile page first.",
        ""
      );
    }
    // Delay navigation to ensure toast is displayed
    setTimeout(() => {
      navigate("/profile");
    }, 2000); // Adjust the delay as needed
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      let err = null;
      setLoading(true);
      try {
        const response = await axios.get(`/${id}`);
        setBlog({
          title: response.data.title,
          description: response.data.description,
          tags: response.data.tags.join(","),
          categories: response.data.categories.join(","),
          email: response.data.createdBy,
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
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
    setSaving(true);
    try {
      await axiosPrivate.put(`/${id}`, Blog);
      showToast("", "Blog updated successfully!!");
      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 2000);
    } catch (error) {
      if (error?.response?.data?.message) err = error.response.data.message;
      else err = error.message;
    } finally {
      setSaving(false);
      if (err) {
        showToast(err, "");
      }
    }
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start text-white p-4 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-bold my-2">
        Edit Your Experience
      </h1>
      <p className="mb-2">
        Please read our{" "}
        <Link className="text-blue-900 hover:underline" to="/guidelines">
          Guidelines
        </Link>{" "}
        page to learn how to re-write your experience concisely!
      </p>
      <div className="w-full lg:w-70 md:w-4/5 text-left bg-yellow-500 p-6 mt-2">
        {loading ? (
          <SkeletonBlog />
        ) : (
          <>
            <BlogWritingCard
              from="EditBlogPage"
              preview={preview}
              blog={blog}
              handleInputChange={handleInputChange}
              togglePreview={togglePreview}
              handleSubmitForm={handleSubmitForm}
              saving={saving}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EditBlogPage;
