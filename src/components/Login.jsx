import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div
        className="mx-auto w-full max-w-lg animate-fade-up rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-10"
      >
        <div className="mb-2 flex justify-center">
          <span className="grid h-20 w-20 place-items-center rounded-3xl bg-slate-950 p-4 shadow-xl shadow-slate-900/20">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black leading-tight tracking-tight text-slate-950">
          Sign in to your account
        </h2>
        <p className="mt-3 text-center text-base text-slate-500">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-bold text-teal-700 transition-all duration-200 hover:text-teal-900 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-8 rounded-2xl bg-rose-50 px-4 py-3 text-center text-sm font-bold text-rose-700">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-bold text-teal-700 transition-all duration-200 hover:text-teal-900 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
