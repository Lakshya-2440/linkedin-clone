/**
 * Notifications API Service
 * Handles all notification-related API operations
 */

import { api } from "./api";

const ENDPOINT = "/notifications";

export const notificationsService = {
  /**
   * Get all notifications for a user
   * @param {number} userId - User ID (for filtering)
   */
  async getNotifications(userId) {
    // In a real app, we'd filter by userId
    // For json-server, we get all and filter client-side
    const notifications = await api.get(ENDPOINT);
    // Sort by date, newest first
    return notifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  /**
   * Get unread notification count
   * @param {number} userId - User ID
   */
  async getUnreadCount(userId) {
    const notifications = await this.getNotifications(userId);
    return notifications.filter((n) => !n.read).length;
  },

  /**
   * Mark a notification as read
   * @param {number} notificationId - Notification ID
   */
  async markAsRead(notificationId) {
    return api.patch(`${ENDPOINT}/${notificationId}`, { read: true });
  },

  /**
   * Mark all notifications as read
   * @param {number} userId - User ID
   */
  async markAllAsRead(userId) {
    const notifications = await this.getNotifications(userId);
    const unread = notifications.filter((n) => !n.read);

    // Update all unread notifications
    const promises = unread.map((n) =>
      api.patch(`${ENDPOINT}/${n.id}`, { read: true })
    );
    await Promise.all(promises);
    return { success: true, markedCount: unread.length };
  },

  /**
   * Create a new notification
   * @param {Object} notification - Notification data
   */
  async createNotification(notification) {
    return api.post(ENDPOINT, {
      ...notification,
      createdAt: new Date().toISOString(),
      read: false,
    });
  },

  /**
   * Delete a notification
   * @param {number} notificationId - Notification ID
   */
  async deleteNotification(notificationId) {
    return api.delete(`${ENDPOINT}/${notificationId}`);
  },

  /**
   * Get notifications by type
   * @param {string} type - Notification type
   */
  async getNotificationsByType(type) {
    const notifications = await api.get(`${ENDPOINT}?type=${type}`);
    return notifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
};
