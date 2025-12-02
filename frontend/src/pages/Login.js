import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const onSubmit = (data) => {
    setServerMessage(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const success = data.email && data.password;

      if (success) {
        setServerMessage({ type: "success", text: "Login successful. Redirecting..." });

        if (typeof setUser === "function") {
          setUser({ email: data.email });
        }

        setTimeout(() => navigate("/"), 900);
      } else {
        setServerMessage({ type: "error", text: "Invalid credentials (mock)." });
      }
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 4, message: "Min 4 chars" } })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Feedback message */}
      {serverMessage && (
        <div
          className={`mt-4 p-3 rounded text-sm ${
            serverMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {serverMessage.text}
        </div>
      )}

      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
