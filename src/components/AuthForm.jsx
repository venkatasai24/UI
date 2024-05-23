import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthForm = ({
  from,
  handleSubmit,
  error,
  success,
  loading,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  password1,
  setPassword1,
  showPassword,
  togglePasswordVisibility,
  showPassword1,
  togglePasswordVisibility1,
}) => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex items-center justify-center py-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {from === "RegisterPage" ? "Create an Account" : "Welcome Back!"}
          </h1>
          <p className="text-lg mb-6 text-center">
            {from === "RegisterPage"
              ? "Please fill out the form below to register"
              : "Please sign in to your account"}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 bg-red-100 p-2 rounded-md mb-2 text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 bg-green-100 p-2 rounded-md mb-2 text-center">
                {success}
              </p>
            )}
            {loading && (
              <p className="text-blue-500 bg-blue-100 p-2 rounded-md mb-2 text-center">
                Loading ...
              </p>
            )}
            {from === "RegisterPage" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {from === "RegisterPage" && (
              <>
                <div className="relative">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                    onClick={togglePasswordVisibility1}
                  >
                    {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              {from === "RegisterPage" ? "Register" : "Sign In"}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            {from === "RegisterPage" ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign in here
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Sign up here
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Media Queries for Responsive Design */}
        <style jsx>{`
          @media only screen and (max-width: 768px) {
            .bg-white.shadow-md.rounded-lg.p-8 {
              width: 90%;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AuthForm;
