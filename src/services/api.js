/**
 * Base API wrapper with error handling
 * All services should use this to make API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add body serialization for objects
  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `API Error: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      error.message || "Network error occurred",
      0,
      error
    );
  }
}

/**
 * HTTP method helpers
 */
export const api = {
  get: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    apiClient(endpoint, { ...options, method: "POST", body }),

  put: (endpoint, body, options = {}) =>
    apiClient(endpoint, { ...options, method: "PUT", body }),

  patch: (endpoint, body, options = {}) =>
    apiClient(endpoint, { ...options, method: "PATCH", body }),

  delete: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: "DELETE" }),
};

export { ApiError, API_BASE_URL };
