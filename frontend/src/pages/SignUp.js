import React from "react";
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/user";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Đăng ký thành công!");
      reset();
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || err.message || "Lỗi đăng ký";
      
      setError("email", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email không hợp lệ",
              },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password là bắt buộc",
              minLength: { value: 6, message: "Password tối thiểu 6 ký tự" },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
          >
            {mutation.isLoading ? "Registering..." : "Sign Up"}
          </button>
        </div>
      </form>

      <div className="mt-4">
        {mutation.isError && (
          <div className="text-red-600">
            {mutation.error?.response?.data?.message || mutation.error?.message || "Lỗi đăng ký"}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="text-green-600">
            Đăng ký thành công! Bạn có thể quay lại{" "}
            <a className="text-blue-600 hover:underline" href="/login">
              đăng nhập
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
