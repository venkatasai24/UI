import useAxiosPrivate from "./useAxiosprivate";
import useAuth from "./useAuth";
import { showToast } from "../components/Toast";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      await axiosPrivate("/users/logout");
      showToast("", "Logged out successfully!!");
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
