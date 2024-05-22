import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/users/profile");
        setUserData(response.data);
        const blogPromises = response.data.blogs.map((blogId) =>
          axios.get(`/${blogId}`)
        );
        const blogResponses = await Promise.all(blogPromises);
        setBlogs(blogResponses.map((res) => res.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
          {userData && (
            <div className="bg-green-500 text-white shadow-md p-6 overflow-auto">
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
          )}
        </div>
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-4">My Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
              blogs.map((blog) => <BlogCard blog={blog} from="Profile" />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
