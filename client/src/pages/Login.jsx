import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

const Login = () => {

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email"}),
    password: z.string().min(6, { message: "Password must be at least 6 chars"}),
  });

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const validate = loginSchema.safeParse(form);
    if (!validate.success) {
      setError(validate.error.format());
      return;
    }
    setLoading(true);
    setError({});
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError({ general: err.response?.data?.msg || "Invalid credentials" });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-300 via-blue-100 to-sky-50">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/30">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8 drop-shadow-md">Login</h1>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
          {error?.email?._errors?.[0] && <p className="text-red-500 text-sm mt-1 px-1">{error.email._errors[0]}</p>}

          <input 
            type="password" 
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
          {error?.password?._errors?.[0] && <p className="text-red-500 text-sm mt-1 px-1">{error.password._errors[0]}</p>}

          {error?.general && <p className="text-red-500 text-sm mt-1 px-1">{error.general}</p>}

          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
          className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-sm"
        >
          <img src="https://img.icons8.com/color/24/google-logo.png" alt="google" />
          Continue with Google
        </button>

        <p className="text-center text-blue-900 mt-6">
          Not registered?{" "}
          <Link to="/" className="font-medium underline hover:text-blue-700">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
