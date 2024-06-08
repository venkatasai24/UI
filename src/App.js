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
import ProfilePage from "./pages/ProfilePage";
import EditBlogPage from "./pages/EditBlogPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import ReadTags from "./pages/ReadTags";
import ReadCategories from "./pages/ReadCategories";
import GuideLines from "./components/GuideLines";
import About from "./components/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Hero />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/read-blogs" element={<ReadBlogs />} />
          <Route path="/guidelines" element={<GuideLines />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/view-profile/:email" element={<ViewProfilePage />} />
          <Route path="/tags/:tag" element={<ReadTags />} />
          <Route path="/categories/:category" element={<ReadCategories />} />
          <Route element={<RequireAuth />}>
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blogs/:id/edit" element={<EditBlogPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
