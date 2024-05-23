import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get("/users/profile");
      setUserData(response.data);
      const blogPromises = response.data.blogs.map((blogId) =>
        axios.get(`/${blogId}`)
      );
      const blogResponses = await Promise.all(blogPromises);
      setBlogs(blogResponses.map((res) => res.data));
    } catch (error) {
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog? This action cannot be undone."
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await axiosPrivate.delete(`/${id}`);
      await getUser(); // Refresh the user data after deleting the blog
    } catch (error) {
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-4 lg:p-8">
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center w-max">
          {error}
        </p>
      )}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="text-white w-full lg:w-1/3">
          <h1 className="text-3xl lg:text-4xl font-bold m-2">Profile</h1>
          {userData ? (
            <div className="bg-green-500 text-white shadow-md p-4 m-2 overflow-auto">
              <p className="text-xl mb-2">
                <strong>Name :</strong> {userData.name}
              </p>
              <p className="text-xl mb-2">
                <strong>Email :</strong> {userData.email}
              </p>
              <p className="text-xl mb-4">
                <strong>Account Created :</strong>{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <>
              {!error && (
                <p className="text-blue-500 bg-blue-100 p-2 rounded-md mb-2 text-center">
                  Loading ...
                </p>
              )}
            </>
          )}
        </div>
        <div className="text-white w-full lg:w-2/3">
          <h2 className="text-3xl lg:text-4xl font-bold m-2">My Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <p className="text-blue-500 bg-blue-100 p-2 rounded-md mb-2 text-center">
                Loading ...
              </p>
            ) : (
              blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  from="Profile"
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
