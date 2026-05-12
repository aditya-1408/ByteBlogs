import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input, Logo } from "../components";
import authService from "../appwrite/auth";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const requestRecovery = async ({ email }) => {
    setError("");
    setSuccess("");

    try {
      await authService.createPasswordRecovery(email);
      setSuccess("Password reset link sent. Please check your email.");
    } catch (error) {
      setError(error.message || "Unable to send reset link.");
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-lg animate-fade-up rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-10">
        <div className="mb-2 flex justify-center">
          <span className="grid h-20 w-20 place-items-center rounded-3xl bg-slate-950 p-4 shadow-xl shadow-slate-900/20">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black leading-tight tracking-tight text-slate-950">
          Reset your password
        </h2>
        <p className="mt-3 text-center text-base text-slate-500">
          Enter your account email and we&apos;ll send a secure reset link.
        </p>

        {error && (
          <p className="mt-8 rounded-2xl bg-rose-50 px-4 py-3 text-center text-sm font-bold text-rose-700">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-8 rounded-2xl bg-teal-50 px-4 py-3 text-center text-sm font-bold text-teal-700">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit(requestRecovery)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-700 transition-all duration-200 hover:text-teal-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
