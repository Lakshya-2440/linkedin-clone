import { useState, useEffect, useCallback } from "react";

/**
 * Generic fetch hook with loading, error, and data states
 * @param {string} url - API endpoint to fetch
 * @param {Object} options - Fetch options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for posting data to an API
 * @returns {Object} { post, loading, error, data }
 */
export function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const post = useCallback(async (url, body, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { post, loading, error, data };
}

/**
 * Hook for optimistic updates
 * @param {Function} apiFn - API function to call
 * @param {Function} onSuccess - Callback on success
 * @param {Function} onError - Callback on error
 */
export function useOptimistic(apiFn, onSuccess, onError) {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (optimisticData, ...args) => {
      // Apply optimistic update immediately
      onSuccess(optimisticData);
      setLoading(true);

      try {
        const result = await apiFn(...args);
        setLoading(false);
        return result;
      } catch (error) {
        // Rollback on error
        onError();
        setLoading(false);
        throw error;
      }
    },
    [apiFn, onSuccess, onError]
  );

  return { execute, loading };
}
