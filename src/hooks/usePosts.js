import { useState, useEffect, useCallback } from "react";
import { postsService } from "../services/postsService";
import { useToast } from "../contexts/ToastContext";

/**
 * Hook for managing posts with optimistic updates
 * Wraps postsService and handles state management
 * @returns {Object} Posts state and actions
 */
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postsService.getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        showToast("Failed to load posts", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [showToast]);

  // Create post with optimistic update
  const createPost = useCallback(
    async (postData) => {
      const tempId = Date.now();
      const optimisticPost = {
        id: tempId,
        ...postData,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      };

      // Optimistic update
      setPosts((prev) => [optimisticPost, ...prev]);

      try {
        const newPost = await postsService.createPost(postData);
        // Replace optimistic post with real one
        setPosts((prev) => prev.map((p) => (p.id === tempId ? newPost : p)));
        showToast("Post published!", "success");
        return newPost;
      } catch (err) {
        // Rollback on error
        setPosts((prev) => prev.filter((p) => p.id !== tempId));
        showToast("Failed to publish post", "error");
        throw err;
      }
    },
    [showToast]
  );

  // Like post with optimistic update
  const likePost = useCallback(
    async (postId, isLiked) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const currentLikes = post.likes || 0;
      const newLikes = isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

      // Optimistic update
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: newLikes } : p))
      );

      try {
        await postsService.likePost(postId, currentLikes, isLiked);
      } catch (err) {
        // Rollback on error
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likes: currentLikes } : p
          )
        );
        showToast("Failed to update like", "error");
      }
    },
    [posts, showToast]
  );

  // Add comment with optimistic update
  const addComment = useCallback(
    async (postId, commentData) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const tempComment = {
        id: Date.now(),
        ...commentData,
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      const previousComments = post.comments || [];
      const updatedComments = [...previousComments, tempComment];

      // Optimistic update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: updatedComments } : p
        )
      );

      try {
        await postsService.addComment(postId, commentData);
        showToast("Comment added!", "success");
      } catch (err) {
        // Rollback on error
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, comments: previousComments } : p
          )
        );
        showToast("Failed to add comment", "error");
      }
    },
    [posts, showToast]
  );

  // Delete post
  const deletePost = useCallback(
    async (postId) => {
      const previousPosts = posts;

      // Optimistic update
      setPosts((prev) => prev.filter((p) => p.id !== postId));

      try {
        await postsService.deletePost(postId);
        showToast("Post deleted", "success");
      } catch (err) {
        // Rollback on error
        setPosts(previousPosts);
        showToast("Failed to delete post", "error");
      }
    },
    [posts, showToast]
  );

  return {
    posts,
    loading,
    error,
    createPost,
    likePost,
    addComment,
    deletePost,
    refreshPosts: () => postsService.getPosts().then(setPosts),
  };
}
