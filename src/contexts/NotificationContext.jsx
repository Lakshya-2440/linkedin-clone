import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

// Example static notifications data
const initialNotifications = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Shubham Patil liked your post",
    type: "all",
    timestamp: "2h",
    unread: true,
    group: "new",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "You have a new connection request from Ryan D'Souza",
    type: "all",
    timestamp: "1d",
    unread: true,
    group: "new",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "Your profile appeared in 5 searches this week",
    type: "jobs",
    timestamp: "3d",
    unread: false,
    group: "earlier",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    text: "Amit Kumar mentioned you in a comment",
    type: "mentions",
    timestamp: "4h",
    unread: true,
    group: "new",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    text: "You have a new job recommendation",
    type: "jobs",
    timestamp: "2d",
    unread: false,
    group: "earlier",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    text: "Priya Sharma liked your comment",
    type: "all",
    timestamp: "3d",
    unread: false,
    group: "earlier",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "You have a new connection request from Anjali Mehta",
    type: "all",
    timestamp: "5h",
    unread: true,
    group: "new",
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    text: "Your application for Software Engineer was viewed",
    type: "jobs",
    timestamp: "4d",
    unread: false,
    group: "earlier",
  },
  {
    id: 9,
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    text: "Rohit Singh mentioned you in a post",
    type: "mentions",
    timestamp: "6h",
    unread: true,
    group: "new",
  },
  {
    id: 10,
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    text: "You have a new job alert",
    type: "jobs",
    timestamp: "1d",
    unread: false,
    group: "earlier",
  },
  {
    id: 11,
    avatar: "https://randomuser.me/api/portraits/women/91.jpg",
    text: "Aman Gupta liked your post",
    type: "all",
    timestamp: "2d",
    unread: false,
    group: "earlier",
  },
  {
    id: 12,
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    text: "You have a new connection request from Sneha Kapoor",
    type: "all",
    timestamp: "3h",
    unread: true,
    group: "new",
  },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Count of unread notifications
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        markAllAsRead,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}