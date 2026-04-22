/**
 * Posts API Service
 * Handles all post-related API operations
 */

import { api } from "./api";

const ENDPOINT = "/posts";

export const postsService = {
  /**
   * Get all posts
   * @param {Object} params - Query parameters (page, limit, sort)
   */
  async getPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `${ENDPOINT}?${queryString}` : ENDPOINT;
    return api.get(endpoint);
  },

  /**
   * Get a single post by ID
   * @param {number} id - Post ID
   */
  async getPostById(id) {
    return api.get(`${ENDPOINT}/${id}`);
  },

  /**
   * Create a new post
   * @param {Object} postData - Post data (text, image, authorId)
   */
  async createPost(postData) {
    return api.post(ENDPOINT, {
      ...postData,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    });
  },

  /**
   * Update an existing post
   * @param {number} id - Post ID
   * @param {Object} updates - Fields to update
   */
  async updatePost(id, updates) {
    return api.patch(`${ENDPOINT}/${id}`, updates);
  },

  /**
   * Delete a post
   * @param {number} id - Post ID
   */
  async deletePost(id) {
    return api.delete(`${ENDPOINT}/${id}`);
  },

  /**
   * Like/unlike a post
   * @param {number} id - Post ID
   * @param {boolean} isLiked - Whether the user is liking or unliking
   */
  async likePost(id, currentLikes, isLiked) {
    const newLikes = isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);
    return api.patch(`${ENDPOINT}/${id}`, { likes: newLikes });
  },

  /**
   * Add a comment to a post
   * @param {number} postId - Post ID
   * @param {Object} comment - Comment data (text, authorId)
   */
  async addComment(postId, comment) {
    const post = await this.getPostById(postId);
    const newComment = {
      id: Date.now(),
      ...comment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    const updatedComments = [...post.comments, newComment];
    return api.patch(`${ENDPOINT}/${postId}`, { comments: updatedComments });
  },

  /**
   * Get posts by author
   * @param {number} authorId - Author user ID
   */
  async getPostsByAuthor(authorId) {
    return api.get(`${ENDPOINT}?authorId=${authorId}`);
  },
};
