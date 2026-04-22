/**
 * Users API Service
 * Handles all user-related API operations
 */

import { api } from "./api";

const ENDPOINT = "/users";

export const usersService = {
  /**
   * Get all users
   */
  async getUsers() {
    return api.get(ENDPOINT);
  },

  /**
   * Get a single user by ID
   * @param {number} id - User ID
   */
  async getUser(id) {
    return api.get(`${ENDPOINT}/${id}`);
  },

  /**
   * Update user profile
   * @param {number} id - User ID
   * @param {Object} updates - Fields to update
   */
  async updateUser(id, updates) {
    return api.patch(`${ENDPOINT}/${id}`, updates);
  },

  /**
   * Search users by name or headline
   * @param {string} query - Search query
   */
  async searchUsers(query) {
    const users = await this.getUsers();
    const lowerQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.headline.toLowerCase().includes(lowerQuery) ||
        user.location.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get user's connections
   * @param {number} userId - User ID
   */
  async getUserConnections(userId) {
    const connections = await api.get("/connections");
    return connections.filter(
      (conn) => conn.userId === userId || conn.connectedUserId === userId
    );
  },

  /**
   * Update user skills
   * @param {number} userId - User ID
   * @param {Array} skills - Updated skills array
   */
  async updateSkills(userId, skills) {
    return api.patch(`${ENDPOINT}/${userId}`, { skills });
  },

  /**
   * Toggle open to work status
   * @param {number} userId - User ID
   * @param {boolean} openToWork - New status
   */
  async toggleOpenToWork(userId, openToWork) {
    return api.patch(`${ENDPOINT}/${userId}`, { openToWork });
  },
};
