import { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import { showToast } from "../components/Toast";
import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import SkeletonBlog from "../components/SkeletonBlog";

const ViewProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useParams();

  const getUser = async () => {
    let err = null;
    setLoading(true);
    try {
      const response = await axios.get(`/users/profile/${email}`);
      setUserData(response.data);
      const blogPromises = response.data.blogs.map((blogId) =>
        axios.get(`/${blogId}`)
      );
      const blogResponses = (await Promise.all(blogPromises)).reverse();
      setBlogs(blogResponses.map((res) => res.data));
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
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="text-white w-full lg:w-1/3">
          <h1 className="text-3xl lg:text-4xl font-bold m-2">Profile</h1>
          {userData ? (
            <ProfileCard userData={userData} />
          ) : (
            <>
              {loading &&
                Array(1)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg m-2 w-full"
                    >
                      <SkeletonBlog from="profile" />
                    </div>
                  ))}
            </>
          )}
        </div>
        <div className="text-white w-full lg:w-2/3">
          <h2 className="text-3xl lg:text-4xl font-bold m-2">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg m-2 w-full"
                    >
                      <SkeletonBlog from="ReadBlogs" />
                    </div>
                  ))
              : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
