import React, { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { FaEllipsisH } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaBellSlash } from "react-icons/fa";
import ProfileSidebar from "../components/ProfileSidebar";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Mentions", value: "mentions" },
  { label: "Jobs", value: "jobs" },
];

function NotificationItem({ notification, onRead, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={`flex items-center px-4 py-3 hover:bg-gray-50 relative group cursor-pointer ${
        notification.unread ? "" : "opacity-70"
      }`}
      onClick={() => {
        if (notification.unread) onRead(notification.id);
      }}
    >
      <div className="flex-shrink-0 mr-3 relative">
        {notification.unread && (
          <span className="absolute -left-3 top-1/2 -translate-y-1/2">
            <FaCircle className="text-blue-500 text-xs" />
          </span>
        )}
        <img
          src={notification.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-900">{notification.text}</div>
        <div className="text-xs text-gray-400 mt-1">{notification.timestamp}</div>
      </div>
      <div
        className="ml-2 relative"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <button className="p-2 rounded-full hover:bg-gray-200">
          <FaEllipsisH />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
            <button
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(notification.id);
                setShowMenu(false);
              }}
            >
              <FaTrashAlt className="mr-2 text-gray-500" /> Delete
            </button>
            <button
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
                // Could add turn off logic here
              }}
            >
              <FaBellSlash className="mr-2 text-gray-500" /> Turn off
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Notifications() {
  const {
    notifications,
    markAllAsRead,
    markAsRead,
    deleteNotification,
  } = useNotification();
  const [activeTab, setActiveTab] = useState("all");

  // Filter notifications by tab
  const filtered = notifications.filter(
    (n) => activeTab === "all" || n.type === activeTab
  );
  // Group by new/earlier
  const newNotifs = filtered.filter((n) => n.group === "new");
  const earlierNotifs = filtered.filter((n) => n.group === "earlier");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block w-1/4 bg-white border-r">
        <ProfileSidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 max-w-2xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button
            className="text-blue-600 hover:underline text-sm font-medium"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        {/* Filter tabs */}
        <div className="flex border-b mb-4">
          {FILTERS.map((tab) => (
            <button
              key={tab.value}
              className={`px-4 py-2 -mb-px font-medium text-sm focus:outline-none transition-colors duration-150 ${
                activeTab === tab.value
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Notifications list */}
        <div className="bg-white rounded-lg shadow divide-y">
          {newNotifs.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs text-gray-400 bg-gray-50">New</div>
              {newNotifs.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
          {earlierNotifs.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs text-gray-400 bg-gray-50">Earlier</div>
              {earlierNotifs.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-400">No notifications</div>
          )}
        </div>
      </div>
    </div>
  );
}
