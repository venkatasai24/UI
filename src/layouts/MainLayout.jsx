// import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PersistLogin from "../utils/persistLogin";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <PersistLogin />
      {/* <Outlet /> */}
      <Footer />
    </>
  );
};

export default MainLayout;
