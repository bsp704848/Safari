import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-xl">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="bg-green-100 rounded-full p-3">
          <UserRound className="w-12 h-12 text-green-700" />
        </div>
        <div className="space-y-1 text-gray-700 text-sm">
          <div>
            <span className="font-semibold">Username:</span> {user.username}
          </div>
          {user.name && (
            <div>
              <span className="font-semibold">Name:</span> {user.name}
            </div>
          )}
          {user.email && (
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 w-full py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
