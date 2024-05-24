import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogWritingCard from "../components/BlogWritingCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { showToast } from "../components/Toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let err = null;
    setSaving(true);
    try {
      await axiosPrivate.put(`/${id}`, blog);
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
