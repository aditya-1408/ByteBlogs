import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import authService from "./appwrite/auth.js";

import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl animate-float-soft" />
        <div className="absolute right-[-10rem] top-8 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl animate-float-soft" />
        <div className="absolute bottom-[-14rem] left-1/3 h-96 w-96 rounded-full bg-amber-100/70 blur-3xl" />
      </div>
      <div className="w-full flex-1">
        <Header />
        <main className="w-full flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
