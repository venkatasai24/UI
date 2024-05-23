// import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PersistLogin from "../utils/persistLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <PersistLogin />
      {/* <Outlet /> */}
      <Footer />
    </>
  );
};

export default MainLayout;
