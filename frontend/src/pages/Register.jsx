import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);
      console.log("Success", res.data);

      setForm({
        username: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.log("Register error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 text-sm mt-2">
            Employee Management System
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-slate-300">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="JohnDoe"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
