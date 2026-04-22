import { useMemo, useRef, useState, useEffect } from "react";
import { FaPlus, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const REACTIONS = [
  { id: "like", label: "Like", emoji: "👍" },
  { id: "love", label: "Love", emoji: "❤️" },
  { id: "funny", label: "Funny", emoji: "😂" },
  { id: "insightful", label: "Insightful", emoji: "😮" },
  { id: "celebrate", label: "Celebrate", emoji: "👏" },
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function ReactionButtonLabel({ reactionId }) {
  const reaction = REACTIONS.find((r) => r.id === reactionId);
  if (!reaction) return "Like";
  return `${reaction.emoji} ${reaction.label}`;
}

export default function Feed() {
  const location = useLocation();
  // --- Stories Data ---
  const userStory = {
    id: 0,
    name: "You",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://picsum.photos/seed/you/400/700",
    isUser: true,
  };
  const stories = [
    userStory,
    {
      id: 1,
      name: "Shubham",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      image: "https://picsum.photos/seed/shubham/400/700",
    },
    {
      id: 2,
      name: "Priya",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      image: "https://picsum.photos/seed/priya/400/700",
    },
    {
      id: 3,
      name: "Amit",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      image: "https://picsum.photos/seed/amit/400/700",
    },
    {
      id: 4,
      name: "Anjali",
      avatar: "https://randomuser.me/api/portraits/women/34.jpg",
      image: "https://picsum.photos/seed/anjali/400/700",
    },
    {
      id: 5,
      name: "Rohit",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      image: "https://picsum.photos/seed/rohit/400/700",
    },
    {
      id: 6,
      name: "Sneha",
      avatar: "https://randomuser.me/api/portraits/women/91.jpg",
      image: "https://picsum.photos/seed/sneha/400/700",
    },
  ];

  // --- Stories Modal State ---
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  // Open story modal
  const openStory = (idx) => {
    setActiveStoryIdx(idx);
    setProgress(0);
    setStoryModalOpen(true);
  };

  // Progress bar and auto-advance
  useEffect(() => {
    if (!storyModalOpen) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          // Auto-advance
          if (activeStoryIdx < stories.length - 1) {
            setActiveStoryIdx((idx) => idx + 1);
            return 0;
          } else {
            setStoryModalOpen(false);
            return 0;
          }
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [storyModalOpen, activeStoryIdx]);

  // --- Stories Bar Component ---
  const StoriesBar = () => (
    <div className="flex items-center space-x-4 overflow-x-auto py-4 px-2 bg-white dark:bg-gray-900 rounded-lg shadow mb-6 scrollbar-thin scrollbar-thumb-gray-300 border border-gray-200 dark:border-gray-700">
      {stories.map((story, idx) => (
        <div key={story.id} className="flex flex-col items-center">
          <button
            className={`relative w-16 h-16 flex items-center justify-center rounded-full border-4 ${
              story.isUser
                ? "border-gray-300 hover:border-blue-400"
                : "border-blue-500 hover:border-blue-700"
            } bg-white shadow group`}
            onClick={() => !story.isUser ? openStory(idx) : null}
          >
            {story.isUser ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <FaPlus className="text-blue-500 text-2xl" />
              </span>
            ) : null}
            <img
              src={story.avatar}
              alt={story.name}
              className={`w-14 h-14 rounded-full object-cover ${
                story.isUser ? "opacity-60" : ""
              }`}
            />
          </button>
          <span className="mt-2 text-xs text-gray-700 dark:text-gray-200 font-medium">
            {story.isUser ? "Create" : story.name}
          </span>
        </div>
      ))}
    </div>
  );

  // --- Stories Modal Viewer ---
  const StoryModal = () => {
    const story = stories[activeStoryIdx];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <div className="absolute top-4 right-4">
          <button
            className="text-white text-2xl p-2 hover:bg-gray-800 rounded-full"
            onClick={() => setStoryModalOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-700 rounded mt-8 mb-2">
            <div
              className="h-1 bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Top bar */}
          <div className="flex items-center w-full px-4 py-2">
            <img
              src={story.avatar}
              alt={story.name}
              className="w-10 h-10 rounded-full border-2 border-blue-400 mr-3"
            />
            <div className="flex-1">
              <div className="text-white font-semibold">{story.name}</div>
              <div className="text-xs text-gray-300">2h ago</div>
            </div>
          </div>
          {/* Story image */}
          <div className="flex-1 flex items-center justify-center w-full">
            <img
              src={story.image}
              alt="story"
              className="max-h-[70vh] w-auto rounded-lg shadow-lg"
            />
          </div>
          {/* Navigation arrows */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            {activeStoryIdx > 0 && (
              <button
                className="text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-90 rounded-full p-2"
                onClick={() => {
                  setActiveStoryIdx((idx) => idx - 1);
                  setProgress(0);
                }}
              >
                <FaChevronLeft />
              </button>
            )}
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {activeStoryIdx < stories.length - 1 && (
              <button
                className="text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-90 rounded-full p-2"
                onClick={() => {
                  setActiveStoryIdx((idx) => idx + 1);
                  setProgress(0);
                }}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  const { currentUser } = useAuth();

  const viewer = useMemo(
    () => ({
      name: currentUser?.name || "LinkedIn Member",
      headline: currentUser?.headline || "Building a professional network",
      avatar: currentUser?.avatar || "https://i.pravatar.cc/150?img=12",
    }),
    [currentUser]
  );

  const initialPosts = useMemo(() => {
    const baseComments = [
      {
        id: uid(),
        author: { name: "Aisha Khan", avatar: "https://i.pravatar.cc/80?img=5" },
        text: "This is super helpful. Thanks for sharing!",
        liked: false,
      },
      {
        id: uid(),
        author: { name: "Rahul Mehta", avatar: "https://i.pravatar.cc/80?img=18" },
        text: "Love the clarity here. Curious what tools you used.",
        liked: false,
      },
    ];

    return [
      {
        id: uid(),
        author: {
          name: "Sara Ali",
          headline: "Product Designer | UX",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        audience: "Anyone",
        timeLabel: "2h",
        text: "Design is not just what it looks like and feels like. Design is how it works.",
        baseLikeCount: 141,
        repostCount: 12,
        comments: baseComments.map((c) => ({ ...c, id: uid() })),
      },
      {
        id: uid(),
        author: {
          name: "Michael Chen",
          headline: "Software Engineer | React",
          avatar: "https://i.pravatar.cc/150?img=11",
        },
        audience: "Anyone",
        timeLabel: "1d",
        text: "Quick tip: keep your components small and your state local unless you truly need to lift it.",
        baseLikeCount: 141,
        repostCount: 3,
        comments: baseComments.map((c) => ({ ...c, id: uid() })),
      },
    ];
  }, []);

  const [posts, setPosts] = useState(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postDraft, setPostDraft] = useState("");
  const [audience, setAudience] = useState("Anyone");
  const [showEmoji, setShowEmoji] = useState(false);

  const [likedPosts, setLikedPosts] = useState(() => new Set());
  const [reactionByPostId, setReactionByPostId] = useState({});
  const [bouncingLikePostId, setBouncingLikePostId] = useState(null);
  const [openReactionForPostId, setOpenReactionForPostId] = useState(null);
  const reactionHoverTimerRef = useRef(null);

  const [showCommentsByPostId, setShowCommentsByPostId] = useState({});
  const [commentDraftByPostId, setCommentDraftByPostId] = useState({});

  const [repostMenuPostId, setRepostMenuPostId] = useState(null);

  const canPost = postDraft.trim().length > 0 && postDraft.length <= 3000;

  // Open composer when navigated from the mobile "+" tab
  useEffect(() => {
    if (location?.state?.compose) {
      setIsModalOpen(true);
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);

  const closeModal = () => {
    setIsModalOpen(false);
    setPostDraft("");
    setAudience("Anyone");
    setShowEmoji(false);
  };

  const submitPost = () => {
    if (!canPost) return;
    const nextPost = {
      id: uid(),
      author: { ...viewer },
      audience,
      timeLabel: "(just now)",
      text: postDraft.slice(0, 3000),
      baseLikeCount: 141,
      repostCount: 0,
      comments: [
        {
          id: uid(),
          author: { name: "Aisha Khan", avatar: "https://i.pravatar.cc/80?img=5" },
          text: "Congrats on posting your first update!",
          liked: false,
        },
        {
          id: uid(),
          author: { name: "Rahul Mehta", avatar: "https://i.pravatar.cc/80?img=18" },
          text: "Nice! Looking forward to more.",
          liked: false,
        },
      ],
    };

    setPosts((prev) => [nextPost, ...prev]);
    closeModal();
  };

  const setLikeBounce = (postId) => {
    setBouncingLikePostId(postId);
    window.setTimeout(() => {
      setBouncingLikePostId((cur) => (cur === postId ? null : cur));
    }, 250);
  };

  const setReaction = (postId, reactionId) => {
    setReactionByPostId((prev) => ({ ...prev, [postId]: reactionId }));
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.add(postId);
      return next;
    });
  };

  const toggleLike = (postId) => {
    setLikeBounce(postId);
    setLikedPosts((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(postId);
      if (isLiked) next.delete(postId);
      else next.add(postId);
      return next;
    });
    setReactionByPostId((prev) => {
      const isLiked = likedPosts.has(postId);
      if (isLiked) {
        const { [postId]: _, ...rest } = prev;
        return rest;
      }
      return prev[postId] ? prev : { ...prev, [postId]: "like" };
    });
  };

  const openReactionPickerWithDelay = (postId) => {
    if (reactionHoverTimerRef.current) window.clearTimeout(reactionHoverTimerRef.current);
    reactionHoverTimerRef.current = window.setTimeout(() => {
      setOpenReactionForPostId(postId);
    }, 500);
  };

  const cancelReactionHover = () => {
    if (reactionHoverTimerRef.current) window.clearTimeout(reactionHoverTimerRef.current);
    reactionHoverTimerRef.current = null;
    setOpenReactionForPostId(null);
  };

  const toggleComments = (postId) => {
    setShowCommentsByPostId((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleCommentLike = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((c) =>
            c.id === commentId ? { ...c, liked: !c.liked } : c
          ),
        };
      })
    );
  };

  const submitComment = (postId) => {
    const text = (commentDraftByPostId[postId] || "").trim();
    if (!text) return;
    const nextComment = {
      id: uid(),
      author: { name: viewer.name, avatar: viewer.avatar },
      text,
      liked: false,
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, nextComment] } : p))
    );
    setCommentDraftByPostId((prev) => ({ ...prev, [postId]: "" }));
  };

  const incrementRepost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, repostCount: (p.repostCount || 0) + 1 } : p))
    );
    setRepostMenuPostId(null);
  };

  const shareInPost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setIsModalOpen(true);
    setAudience("Anyone");
    setPostDraft(post ? `Sharing: “${post.text.slice(0, 160)}” ` : "");
    setRepostMenuPostId(null);
  };

  const insertEmoji = (emoji) => {
    const next = `${postDraft}${emoji}`;
    setPostDraft(next.length <= 3000 ? next : postDraft);
  };

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="h-14 bg-gradient-to-r from-blue-600 to-sky-400" />
            <div className="-mt-7 px-4 pb-4">
              <img
                src={viewer.avatar}
                alt={viewer.name}
                className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-900"
              />
              <div className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
                {viewer.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {viewer.headline}
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Connections: {currentUser?.connections ?? 312}
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-6 space-y-4">
          {/* --- Stories Bar --- */}
          <StoriesBar />
          {/* --- Stories Modal Viewer --- */}
          {storyModalOpen && <StoryModal />}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <img src={viewer.avatar} alt={viewer.name} className="w-12 h-12 rounded-full" />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 text-left border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2.5 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Start a post
              </button>
            </div>
            <div className="hidden sm:grid mt-3 grid-cols-4 gap-2 text-sm">
              {[
                { label: "Photo", color: "text-blue-600", icon: "🖼️" },
                { label: "Video", color: "text-green-600", icon: "🎥" },
                { label: "Document", color: "text-orange-600", icon: "📄" },
                { label: "Emoji", color: "text-yellow-600", icon: "😊" },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  <span className={cx("text-base", b.color)}>{b.icon}</span>
                  <span className="hidden sm:inline">{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {posts.map((post) => {
            const isLiked = likedPosts.has(post.id);
            const reactionId = reactionByPostId[post.id];
            const likeCount = post.baseLikeCount + (isLiked ? 1 : 0);
            const showComments = Boolean(showCommentsByPostId[post.id]);
            const isBouncing = bouncingLikePostId === post.id;
            const reactionOpen = openReactionForPostId === post.id;
            const repostMenuOpen = repostMenuPostId === post.id;

            return (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {post.author.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300 truncate">
                            {post.author.headline}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {post.timeLabel} · {post.audience}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                          ⋯
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                    {post.text}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
                    <div>
                      {isLiked ? `You and ${post.baseLikeCount} others` : `${likeCount} likes`}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleComments(post.id)}
                        className="hover:underline"
                      >
                        {post.comments.length} comments
                      </button>
                      <div>{post.repostCount} reposts</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-2">
                  <div className="grid grid-cols-4">
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => openReactionPickerWithDelay(post.id)}
                        onMouseLeave={cancelReactionHover}
                        onClick={() => toggleLike(post.id)}
                        className={cx(
                          "w-full flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium",
                          isLiked ? "text-blue-700" : "text-gray-600 dark:text-gray-200"
                        )}
                      >
                        <span
                          className={cx(
                            "inline-flex items-center justify-center transition-transform duration-150",
                            isBouncing && "scale-125"
                          )}
                        >
                          👍
                        </span>
                        <span className="hidden sm:inline">
                          <ReactionButtonLabel reactionId={reactionId} />
                        </span>
                      </button>

                      {reactionOpen && (
                        <div
                          onMouseEnter={() => {
                            if (reactionHoverTimerRef.current) {
                              window.clearTimeout(reactionHoverTimerRef.current);
                              reactionHoverTimerRef.current = null;
                            }
                            setOpenReactionForPostId(post.id);
                          }}
                          onMouseLeave={cancelReactionHover}
                          className="absolute left-2 -top-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-full px-2 py-1 flex items-center gap-1 z-20"
                        >
                          {REACTIONS.map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => {
                                setLikeBounce(post.id);
                                setReaction(post.id, r.id);
                                setOpenReactionForPostId(null);
                              }}
                              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                              title={r.label}
                            >
                              <span className="text-lg">{r.emoji}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-200"
                    >
                      💬 <span className="hidden sm:inline">Comment</span>
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setRepostMenuPostId((cur) => (cur === post.id ? null : post.id))
                        }
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-200"
                      >
                        🔁 <span className="hidden sm:inline">Repost</span>
                      </button>
                      {repostMenuOpen && (
                        <div className="absolute right-2 top-12 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden z-20">
                          <button
                            type="button"
                            onClick={() => incrementRepost(post.id)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-100"
                          >
                            Repost
                          </button>
                          <button
                            type="button"
                            onClick={() => shareInPost(post.id)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-100"
                          >
                            Share in a post
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-200"
                    >
                      ✉️ <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </div>

                {showComments && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                    <div className="space-y-3">
                      {post.comments.map((c) => (
                        <div key={c.id} className="flex items-start gap-3">
                          <img
                            src={c.author.avatar}
                            alt={c.author.name}
                            className="w-9 h-9 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2">
                              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {c.author.name}
                              </div>
                              <div className="text-sm text-gray-800 dark:text-gray-200">
                                {c.text}
                              </div>
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-300">
                              <button
                                type="button"
                                onClick={() => toggleCommentLike(post.id, c.id)}
                                className={cx("hover:underline", c.liked && "text-blue-700")}
                              >
                                Like
                              </button>
                              <button
                                type="button"
                                className="hover:underline"
                                onClick={() =>
                                  setCommentDraftByPostId((prev) => ({
                                    ...prev,
                                    [post.id]: `${(prev[post.id] || "").trim()} @${c.author.name} `,
                                  }))
                                }
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src={viewer.avatar}
                        alt={viewer.name}
                        className="w-9 h-9 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            value={commentDraftByPostId[post.id] || ""}
                            onChange={(e) =>
                              setCommentDraftByPostId((prev) => ({
                                ...prev,
                                [post.id]: e.target.value.slice(0, 3000),
                              }))
                            }
                            placeholder="Add a comment…"
                            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => submitComment(post.id)}
                            disabled={!((commentDraftByPostId[post.id] || "").trim().length > 0)}
                            className={cx(
                              "px-3 py-2 rounded-full text-sm font-semibold",
                              (commentDraftByPostId[post.id] || "").trim().length > 0
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed"
                            )}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="font-semibold text-gray-900 dark:text-gray-100">Trending</div>
            <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-200">
              <div className="hover:underline cursor-pointer">#react</div>
              <div className="hover:underline cursor-pointer">#design</div>
              <div className="hover:underline cursor-pointer">#careers</div>
            </div>
          </div>
        </aside>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img src={viewer.avatar} alt={viewer.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {viewer.name}
                  </div>
                  <div className="mt-1">
                    <select
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-full px-3 py-1.5 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Anyone</option>
                      <option>Connections only</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-200"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <textarea
                value={postDraft}
                onChange={(e) => {
                  const v = e.target.value;
                  setPostDraft(v.length <= 3000 ? v : v.slice(0, 3000));
                }}
                placeholder="What do you want to talk about?"
                className="w-full min-h-[180px] resize-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-300">
                <div className={cx(postDraft.length > 3000 && "text-red-600")}>
                  {postDraft.length}/3000
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmoji((s) => !s)}
                  className="hover:underline"
                >
                  {showEmoji ? "Hide emojis" : "Emoji picker"}
                </button>
              </div>

              {showEmoji && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {["😊", "🎉", "🔥", "💡", "🚀", "👏", "❤️", "😂"].map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => insertEmoji(e)}
                      className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-lg"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                {[
                  { label: "Photo", icon: "🖼️" },
                  { label: "Video", icon: "🎥" },
                  { label: "Document", icon: "📄" },
                  { label: "Emoji", icon: "😊" },
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => (t.label === "Emoji" ? setShowEmoji(true) : null)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                    title={t.label}
                  >
                    <span className="text-lg">{t.icon}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!canPost}
                onClick={submitPost}
                className={cx(
                  "px-5 py-2 rounded-full text-sm font-semibold",
                  canPost
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed"
                )}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
