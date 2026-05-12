import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-flex items-center rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 shadow-sm shadow-rose-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
