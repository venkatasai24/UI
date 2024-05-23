import Hero from "./components/Hero";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ReadBlogs from "./pages/ReadBlogs";
import BlogPage from "./pages/BlogPage";
import WriteBlog from "./pages/WriteBlog";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./utils/RequireAuth";
// import PersistLogin from "./utils/persistLogin";
import ProfilePage from "./pages/ProfilePage";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Hero />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/read-blogs" element={<ReadBlogs />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          {/* <Route element={<PersistLogin />}> */}
          <Route element={<RequireAuth />}>
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blogs/:id/edit" element={<EditBlogPage />} />
          </Route>
          {/* </Route> */}
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
