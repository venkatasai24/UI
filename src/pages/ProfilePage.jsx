import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import { showToast } from "../components/Toast";
import ProfileCard from "../components/ProfileCard";
import SkeletonBlog from "../components/SkeletonBlog";
import { validateEmail } from "./RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../features/auth/authSlice";

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [showBookmarkedBlogs, setShowBookmarkedBlogs] = useState(false); // State to toggle display of bookmarked blogs
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUserData = async (email, accessToken) => {
    let err = null;
    setLoading(true);
    setLoading2(true);
    try {
      if (accessToken) {
        // Set the access token for axiosPrivate
        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
      const [userResponse, bookmarksResponse] = await Promise.all([
        axios.get(`/users/profile/${email}`),
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
      setLoading2(false);
      if (err) {
        showToast(err, "");
      }
    }
  };

  const handleSubmit = async (e, user) => {
    e.preventDefault();
    let err = null;
    let originalData = userData;
    setUserData(null);
    setLoading2(true);
    // Check if there are any changes to be made
    if (user.name === userData.name && user.email === userData.email) {
      setLoading2(false);
      setUserData(originalData);
      showToast("No changes done!!", "");
      return;
    }
    // email Validation
    if (!validateEmail(user.email)) {
      setLoading2(false);
      setUserData(originalData);
      showToast("Invalid email address", "");
      return;
    }
    // name Validation
    if (user.name.length === 0) {
      setLoading2(false);
      setUserData(originalData);
      showToast("Name cannot be empty!!", "");
      return;
    }
    try {
      const response = await axiosPrivate.post("/users/edit-profile", user);
      // Update user data and auth context if email has changed
      const updatedData = {
        name: response.data.name,
        email: response.data.email,
        createdAt: response.data.createdAt,
      };
      setUserData(updatedData);
      showToast("", "Profile updated successfully!!");
      if (auth?.email !== response.data.email) {
        dispatch(
          setAuth({
            email: response.data.email,
            accessToken: response.data.accessToken,
          })
        );
        // setAuth({
        // });
        await getUserData(response.data.email, response.data.accessToken);
      }
    } catch (error) {
      if (error?.response?.data?.message) err = error.response.data.message;
      else err = error.message;
    } finally {
      setLoading2(false);
      // Only reset userData to original data if there was an error
      if (err) {
        setUserData(originalData);
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
      await getUserData(auth?.email); // Refresh the user data after deleting the blog
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
    getUserData(auth?.email);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="text-white w-full lg:w-1/3">
          <h1 className="text-3xl lg:text-4xl font-bold m-2">Profile</h1>
          {userData ? (
            <ProfileCard
              userData={userData}
              from="ProfilePage"
              handleSubmit={handleSubmit}
            />
          ) : (
            <>
              {loading2 &&
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
          <p className="text-md my-4 mx-2">
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
