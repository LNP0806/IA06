import React, { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);

  const location = useLocation();

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" state={{ from: location }} />;
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold">IA06 App</div>
          <div className="space-x-4">
            {user ? (
              <>
                <Link className="text-slate-700 hover:text-slate-900" to="/">
                  Home
                </Link>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => setUser(null)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="text-slate-700 hover:text-slate-900" to="/login">
                  Login
                </Link>
                <Link className="text-slate-700 hover:text-slate-900" to="/signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route
            path="/login"
            element={<Login setUser={setUser} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
