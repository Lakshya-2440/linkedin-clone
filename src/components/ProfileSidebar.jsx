import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileSidebar() {
  // Example user data, replace with real user from AuthContext
  const { user } = useAuth ? useAuth() : { user: null };
  const profile =
    user || {
      name: "Lakshya Gupta",
      title: "Web Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      connections: 120,
    };
  return (
    <div className="p-6 border-b bg-white">
      <div className="flex flex-col items-center">
        <img
          src={profile.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-blue-200 mb-2"
        />
        <div className="font-semibold text-lg text-gray-900">{profile.name}</div>
        <div className="text-sm text-gray-500 mb-2">{profile.title}</div>
        <div className="text-xs text-gray-400">{profile.connections} connections</div>
      </div>
    </div>
  );
}