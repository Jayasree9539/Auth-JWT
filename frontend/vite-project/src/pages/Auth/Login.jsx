import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from "../../store/authStore";
import { loginUser } from '../../api/userService';
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setUser(response);
      toast.success("Login successful");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New Customer?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
