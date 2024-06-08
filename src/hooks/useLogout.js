import useAxiosPrivate from "./useAxiosprivate";
import { showToast } from "../components/Toast";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    dispatch(logOut({}));
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
