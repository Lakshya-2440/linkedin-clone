/**
 * Jobs API Service
 * Handles all job-related API operations
 */

import { api } from "./api";

const ENDPOINT = "/jobs";

export const jobsService = {
  /**
   * Get all jobs
   * @param {Object} filters - Filter parameters (type, location, experience)
   */
  async getJobs(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const endpoint = queryString ? `${ENDPOINT}?${queryString}` : ENDPOINT;
    return api.get(endpoint);
  },

  /**
   * Get a single job by ID
   * @param {number} id - Job ID
   */
  async getJobById(id) {
    return api.get(`${ENDPOINT}/${id}`);
  },

  /**
   * Search jobs by title or company
   * @param {string} query - Search query
   */
  async searchJobs(query) {
    const jobs = await this.getJobs();
    const lowerQuery = query.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery) ||
        job.location.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Save a job for later
   * @param {number} userId - User ID
   * @param {number} jobId - Job ID to save
   */
  async saveJob(userId, jobId) {
    // In a real app, this would save to user's saved jobs
    // For json-server, we'll track in local storage or state
    const savedJobs = JSON.parse(localStorage.getItem(`savedJobs_${userId}`) || "[]");
    if (!savedJobs.includes(jobId)) {
      savedJobs.push(jobId);
      localStorage.setItem(`savedJobs_${userId}`, JSON.stringify(savedJobs));
    }
    return { success: true, savedJobs };
  },

  /**
   * Get saved jobs for a user
   * @param {number} userId - User ID
   */
  async getSavedJobs(userId) {
    const savedJobIds = JSON.parse(localStorage.getItem(`savedJobs_${userId}`) || "[]");
    const allJobs = await this.getJobs();
    return allJobs.filter((job) => savedJobIds.includes(job.id));
  },

  /**
   * Unsave a job
   * @param {number} userId - User ID
   * @param {number} jobId - Job ID to unsave
   */
  async unsaveJob(userId, jobId) {
    const savedJobs = JSON.parse(localStorage.getItem(`savedJobs_${userId}`) || "[]");
    const updated = savedJobs.filter((id) => id !== jobId);
    localStorage.setItem(`savedJobs_${userId}`, JSON.stringify(updated));
    return { success: true, savedJobs: updated };
  },

  /**
   * Apply for a job
   * @param {number} jobId - Job ID
   * @param {Object} application - Application data (userId, resume, coverLetter)
   */
  async applyJob(jobId, application) {
    // In a real app, this would submit to an applications endpoint
    // For mock purposes, we'll just return success
    const job = await this.getJobById(jobId);
    return {
      success: true,
      message: `Application submitted for ${job.title} at ${job.company}`,
      appliedAt: new Date().toISOString(),
    };
  },

  /**
   * Get jobs by location
   * @param {string} location - Location to filter by
   */
  async getJobsByLocation(location) {
    const jobs = await this.getJobs();
    return jobs.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  },

  /**
   * Get promoted/easy apply jobs
   */
  async getFeaturedJobs() {
    const jobs = await this.getJobs();
    return jobs.filter((job) => job.promoted || job.easyApply).slice(0, 3);
  },
};
