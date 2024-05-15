import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center flex flex-col justify-center items-center h-screen">
        <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-xl mb-5">This page does not exist</p>
        <Link
          to="/"
          className="text-white bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 mt-4 transition duration-300"
        >
          Go Back
        </Link>
      </section>
    </>
  );
};

export default NotFoundPage;
