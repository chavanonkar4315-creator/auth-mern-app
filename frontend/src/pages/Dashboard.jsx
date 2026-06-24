import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("Please login again");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");

    navigate("/login");
  };
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/*navbar*/}
      <nav
        className={`shadow-md px-8 py-4 flex justify-between items-center ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold text-blue-600">Auth System</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            darkMode
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </nav>
      {/*Main content */}
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`shadow-xl rounded-2xl p-8 w-full max-w-md text-center ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <FaUserCircle className="text-7xl text-blue-500 mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-2">
            Welcom, {user?.name || "Captian"}
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {user?.email}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">You are successfully logged in.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
