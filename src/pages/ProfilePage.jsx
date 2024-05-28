import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import { showToast } from "../components/Toast";
import useAuth from "../hooks/useAuth";
import ProfileCard from "../components/ProfileCard";
import SkeletonBlog from "../components/SkeletonBlog";

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookmarkedBlogs, setShowBookmarkedBlogs] = useState(false); // State to toggle display of bookmarked blogs
  const { auth } = useAuth();

  const getUserData = async () => {
    let err = null;
    setLoading(true);
    try {
      const [userResponse, bookmarksResponse] = await Promise.all([
        axios.get(`/users/profile/${auth?.email}`),
        axiosPrivate.get(`/users/bookmarks`),
      ]);

      const user = userResponse.data;
      setUserData(user);

      const blogPromises = user.blogs.map((blogId) => axios.get(`/${blogId}`));
      const blogResponses = (await Promise.all(blogPromises)).reverse();
      setBlogs(blogResponses.map((res) => res.data));

      const bookmarkPromises = bookmarksResponse.data.map((blogId) =>
        axios.get(`/${blogId}`)
      );
      const bookmarkResponses = (await Promise.all(bookmarkPromises)).reverse();
      setBookmarkedBlogs(bookmarkResponses.map((res) => res.data));
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

  const handleDelete = async (e, id, email) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog? This action cannot be undone."
    );
    if (!confirmDelete) return;
    let err = null;
    setLoading(true);
    try {
      await axiosPrivate.delete(`/${id}`, { data: { email } });
      showToast("", "Blog deleted successfully!!");
      await getUserData(); // Refresh the user data after deleting the blog
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
    getUserData();
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
          <p className="text-sm lg:text-md my-4 mx-2">
            Press the{" "}
            <b> {showBookmarkedBlogs ? "Bookmarked Blogs" : "My Blogs"}</b>{" "}
            heading to see the magic :)
          </p>
        </div>
        <div className="text-white w-full lg:w-2/3">
          <h2
            className="text-3xl lg:text-4xl font-bold m-2"
            onClick={() => setShowBookmarkedBlogs(!showBookmarkedBlogs)} // Toggle display of bookmarked blogs on click
          >
            {showBookmarkedBlogs ? "Bookmarked Blogs" : "My Blogs"}{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg m-2 w-full"
                  >
                    <SkeletonBlog from="ReadBlogs" />
                  </div>
                ))
            ) : showBookmarkedBlogs ? (
              bookmarkedBlogs.length ? (
                bookmarkedBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))
              ) : (
                <p className="p-2">No Bookmarked Blogs to show ... :(</p>
              )
            ) : blogs.length ? (
              blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  from="Profile"
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p className="p-2">No Blogs to show ... :(</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
