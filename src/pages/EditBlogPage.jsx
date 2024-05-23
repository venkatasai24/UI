import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogWritingCard from "../components/BlogWritingCard";
import SkeletonBlog from "../components/SkeletonBlog";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
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
    setSaving(true);
    try {
      await axiosPrivate.put(`/${id}`, blog);
      navigate(`/blogs/${id}`);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start text-white p-4 lg:p-8">
      <div className="w-full lg:w-70 md:w-4/5 text-left bg-yellow-500 p-6">
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded-md mb-2 text-center">
            {error}
          </p>
        )}
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
