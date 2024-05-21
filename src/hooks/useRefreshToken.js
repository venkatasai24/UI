import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/users/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        // console.log(JSON.stringify(prev));
        // console.log(response.data);
        return {
          accessToken: response.data.accessToken,
          email: response.data?.email,
        };
      });
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
