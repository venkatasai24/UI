import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/users/refresh", {
        withCredentials: true,
      });
      dispatch(
        setAuth({
          accessToken: response.data?.accessToken,
          email: response.data?.email,
        })
      );
      return response.data.accessToken;
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        navigate("/login");
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
