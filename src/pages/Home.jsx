import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const profiledata = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to InnoByte Services</h1>
      <p className="text-xl mb-8">Hello, {profiledata.username}</p>
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        onClick={() => navigate("/profile")}
      >
        Go to Profile
      </button>
    </div>
  );
}

export default Home;
