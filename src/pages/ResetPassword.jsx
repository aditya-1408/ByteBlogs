import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input, Logo } from "../components";
import authService from "../appwrite/auth";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const hasRecoveryParams = Boolean(userId && secret);

  const resetPassword = async ({ password }) => {
    setError("");
    setSuccess("");

    if (!hasRecoveryParams) {
      setError("Reset link is missing required recovery details.");
      return;
    }

    try {
      await authService.updatePasswordRecovery({ userId, secret, password });
      setSuccess("Password updated successfully. Redirecting to sign in...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setError(error.message || "Unable to reset password.");
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
          Create new password
        </h2>
        <p className="mt-3 text-center text-base text-slate-500">
          Choose a strong password to secure your MegaBlog account.
        </p>

        {!hasRecoveryParams && (
          <p className="mt-8 rounded-2xl bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-700">
            This reset link is invalid or incomplete. Please request a new one.
          </p>
        )}
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

        <form onSubmit={handleSubmit(resetPassword)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="New password: "
              placeholder="Enter new password"
              type="password"
              disabled={!hasRecoveryParams}
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
            />
            {errors.password?.message && (
              <p className="-mt-3 px-1 text-sm font-bold text-rose-600">
                {errors.password.message}
              </p>
            )}
            <Input
              label="Confirm password: "
              placeholder="Confirm new password"
              type="password"
              disabled={!hasRecoveryParams}
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match.",
              })}
            />
            {errors.confirmPassword?.message && (
              <p className="-mt-3 px-1 text-sm font-bold text-rose-600">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={!hasRecoveryParams}>
              Update password
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Need another link?{" "}
          <Link
            to="/forgot-password"
            className="font-bold text-teal-700 transition-all duration-200 hover:text-teal-900 hover:underline"
          >
            Request reset
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
