import { useMemo, useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Calendar,
  ChevronDown,
  Image,
  Info,
  MessageCircle,
  Newspaper,
  Repeat2,
  Send,
  ThumbsUp,
  Video,
  Bookmark,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { SkeletonPost, SkeletonList } from "../components/Skeleton";
import { useInView } from "../hooks/useInView";

// AI Generated Post Templates
const AI_POST_TEMPLATES = [
  "Just wrapped up an amazing week of learning and growth! 🚀 Excited to share that I've been exploring new ways to leverage AI in my workflow, and the results have been incredible. The future of work is here, and I'm here for it! What new skills are you building this year? #GrowthMindset #AI #CareerDevelopment",
  "Reflecting on the power of mentorship today. Having someone who believes in you can change everything. 💡 To all the mentors who've guided me - thank you. And to those earlier in their journey: don't be afraid to reach out. People are more willing to help than you think. #Mentorship #PayItForward #CareerAdvice",
  "Remote work has taught me that discipline > motivation. 🎯 Some days you don't feel like it, but showing up consistently is what separates good from great. What's your secret to staying productive? #RemoteWork #Productivity #Discipline",
  "Big announcement! 🎉 I'm thrilled to share that I've completed my certification in [field]. It was challenging, rewarding, and absolutely worth every late night. Never stop investing in yourself! #Certification #ContinuousLearning #Achievement",
  "Hot take: Your network is your net worth isn't just a cliché - it's reality. 🤝 I've seen more doors open through genuine relationships than perfect resumes. Start conversations, offer value, stay curious. #Networking #CareerTips #ProfessionalGrowth",
];

const REACTIONS = [
  { id: "like", label: "Like", emoji: "👍" },
  { id: "love", label: "Love", emoji: "❤️" },
  { id: "funny", label: "Funny", emoji: "😂" },
  { id: "insightful", label: "Insightful", emoji: "😮" },
  { id: "celebrate", label: "Celebrate", emoji: "👏" },
];

const NEWS_ITEMS = [
  { title: "Tech hiring picks up in Bengaluru", meta: "2h ago • 4,238 readers" },
  { title: "Product teams lean harder into AI workflows", meta: "5h ago • 3,112 readers" },
  { title: "Design leaders talk portfolio storytelling", meta: "8h ago • 1,829 readers" },
  { title: "Remote roles remain strong in developer market", meta: "1d ago • 5,004 readers" },
];

const PUZZLES = [
  { name: "Zip", hint: "Perfect streak: 7" },
  { name: "Tango", hint: "New puzzle available" },
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
  return reaction.label;
}

export default function Feed() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

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

  // AI Assistant state
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedText, setAiGeneratedText] = useState("");
  const [aiResponseIndex, setAiResponseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const { showToast } = useToast();

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
  }, [location?.state]);

  // Skeleton loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // AI typing animation effect
  useEffect(() => {
    if (!aiGenerating || !aiGeneratedText) return;

    let currentIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIndex < aiGeneratedText.length) {
        setDisplayedText(aiGeneratedText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setAiGenerating(false);
      }
    }, 15); // Typing speed

    return () => clearInterval(interval);
  }, [aiGenerating, aiGeneratedText]);

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setAiGeneratedText(AI_POST_TEMPLATES[aiResponseIndex]);
  };

  const handleAiRegenerate = () => {
    const nextIndex = (aiResponseIndex + 1) % AI_POST_TEMPLATES.length;
    setAiResponseIndex(nextIndex);
    setAiGenerating(true);
    setAiGeneratedText(AI_POST_TEMPLATES[nextIndex]);
  };

  const handleAiUse = () => {
    setPostDraft(aiGeneratedText);
    setShowAiPanel(false);
    setAiPrompt("");
    setAiGeneratedText("");
    setDisplayedText("");
  };

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
    showToast("Post published successfully!", "success");
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
    showToast("Reaction added!", "success");
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
    showToast("Comment posted!", "success");
  };

  const incrementRepost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, repostCount: (p.repostCount || 0) + 1 } : p))
    );
    setRepostMenuPostId(null);
    showToast("Reposted!", "success");
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
    <div className="linkedin-page">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[225px_minmax(0,1fr)_300px]">
        <aside className="hidden space-y-4 lg:block lg:sticky lg:top-[72px] lg:h-fit">
          <div className="linkedin-surface overflow-hidden">
            <div className="h-14 bg-[linear-gradient(135deg,#70b5f9,#0a66c2)]" />
            <div className="px-3 pb-3">
              <img
                src={viewer.avatar}
                alt={viewer.name}
                className="-mt-8 h-[72px] w-[72px] rounded-full border-2 border-white object-cover"
              />
              <Link
                to={`/profile/${currentUser?.id || "1"}`}
                className="mt-3 block text-base font-semibold text-[#191919] hover:underline"
              >
                {viewer.name}
              </Link>
              <p className="mt-1 text-xs leading-4 text-[#666666]">{viewer.headline}</p>
            </div>

            <div className="border-t border-gray-200 px-3 py-2 text-xs">
              <button
                type="button"
                className="flex w-full items-center justify-between py-1.5 text-left text-[#666666] hover:bg-gray-50"
              >
                <span>Profile viewers</span>
                <span className="font-semibold text-[#0a66c2]">129</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between py-1.5 text-left text-[#666666] hover:bg-gray-50"
              >
                <span>Connections</span>
                <span className="font-semibold text-[#0a66c2]">
                  {currentUser?.connections ?? 312}
                </span>
              </button>
            </div>

            <div className="border-t border-gray-200 px-3 py-3">
              <div className="text-xs text-[#666666]">Grow faster with Premium</div>
              <button
                type="button"
                className="mt-1 text-left text-xs font-semibold text-[#915907] hover:underline"
              >
                Try Premium for Rs0
              </button>
            </div>

            <div className="border-t border-gray-200 px-3 py-3">
              <Link
                to="/settings"
                className="flex items-center gap-2 text-sm font-semibold text-[#191919] hover:underline"
              >
                <Bookmark className="h-4 w-4 text-[#666666]" />
                Saved items
              </Link>
            </div>
          </div>

          <div className="linkedin-surface p-3 text-sm">
            <Link to="/events" className="block py-1 font-semibold text-[#0a66c2] hover:underline">
              Events
            </Link>
            <Link
              to="/analytics"
              className="mt-1 block py-1 font-semibold text-[#0a66c2] hover:underline"
            >
              Analytics
            </Link>
            <Link
              to="/network"
              className="mt-1 block py-1 font-semibold text-[#0a66c2] hover:underline"
            >
              Groups
            </Link>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="linkedin-surface p-4">
            <div className="flex items-start gap-3">
              <img src={viewer.avatar} alt={viewer.name} className="h-12 w-12 rounded-full" />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 rounded-full border border-gray-400 px-4 py-2.5 text-left text-sm font-medium text-[#666666] transition hover:bg-gray-50"
              >
                Start a post
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-4">
              {[
                { label: "Media", icon: Image, color: "text-[#378fe9]" },
                { label: "Video", icon: Video, color: "text-[#5f9b41]" },
                { label: "Event", icon: Calendar, color: "text-[#c37d16]" },
                { label: "Write article", icon: Newspaper, color: "text-[#e06847]" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-[#666666] hover:bg-gray-50"
                >
                  <item.icon className={cx("h-5 w-5", item.color)} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 px-1 text-xs text-[#666666]">
            <div className="h-px flex-1 bg-gray-300" />
            <button type="button" className="flex items-center gap-1">
              <span>Sort by:</span>
              <span className="font-semibold text-[#191919]">Top</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {isLoading && <SkeletonList count={3} type="post" />}

          {!isLoading &&
            posts.map((post, index) => {
              const isLiked = likedPosts.has(post.id);
              const reactionId = reactionByPostId[post.id];
              const likeCount = post.baseLikeCount + (isLiked ? 1 : 0);
              const showComments = Boolean(showCommentsByPostId[post.id]);
              const isBouncing = bouncingLikePostId === post.id;
              const reactionOpen = openReactionForPostId === post.id;
              const repostMenuOpen = repostMenuPostId === post.id;

              return (
                <AnimatedPost key={post.id} index={index}>
                  <article className="linkedin-surface overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-[#191919]">
                                {post.author.name}
                              </div>
                              <div className="truncate text-xs text-[#666666]">
                                {post.author.headline}
                              </div>
                              <div className="mt-0.5 text-xs text-[#666666]">
                                {post.timeLabel} • {post.audience}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="rounded-full px-2 py-1 text-sm font-semibold text-[#0a66c2] hover:bg-[#edf3f8]"
                            >
                              + Follow
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 whitespace-pre-wrap text-[15px] leading-6 text-[#191919]">
                        {post.text}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-[#666666]">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#edf3f8] px-2 py-0.5 text-[11px] text-[#191919]">
                            <span>👍</span>
                            <span>❤️</span>
                          </span>
                          <span>
                            {isLiked
                              ? `You and ${post.baseLikeCount} others`
                              : `${likeCount} reactions`}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleComments(post.id)}
                            className="hover:underline"
                          >
                            {post.comments.length} comments
                          </button>
                          <span>{post.repostCount} reposts</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-2">
                      <div className="grid grid-cols-4">
                        <div className="relative">
                          <button
                            type="button"
                            onMouseEnter={() => openReactionPickerWithDelay(post.id)}
                            onMouseLeave={cancelReactionHover}
                            onClick={() => toggleLike(post.id)}
                            className={cx(
                              "flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold hover:bg-gray-50",
                              isLiked ? "text-[#0a66c2]" : "text-[#666666]"
                            )}
                          >
                            <ThumbsUp
                              className={cx(
                                "h-4 w-4 transition-transform duration-150",
                                isBouncing && "scale-125"
                              )}
                            />
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
                              className="absolute left-2 -top-14 z-20 flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 shadow-lg"
                            >
                              {REACTIONS.map((reaction) => (
                                <button
                                  key={reaction.id}
                                  type="button"
                                  onClick={() => {
                                    setLikeBounce(post.id);
                                    setReaction(post.id, reaction.id);
                                    setOpenReactionForPostId(null);
                                  }}
                                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
                                  title={reaction.label}
                                >
                                  <span className="text-lg">{reaction.emoji}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleComments(post.id)}
                          className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-[#666666] hover:bg-gray-50"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="hidden sm:inline">Comment</span>
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setRepostMenuPostId((cur) => (cur === post.id ? null : post.id))
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-[#666666] hover:bg-gray-50"
                          >
                            <Repeat2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Repost</span>
                          </button>

                          {repostMenuOpen && (
                            <div className="absolute right-2 top-12 z-20 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                              <button
                                type="button"
                                onClick={() => incrementRepost(post.id)}
                                className="w-full px-3 py-2 text-left text-sm text-[#191919] hover:bg-gray-50"
                              >
                                Repost
                              </button>
                              <button
                                type="button"
                                onClick={() => shareInPost(post.id)}
                                className="w-full px-3 py-2 text-left text-sm text-[#191919] hover:bg-gray-50"
                              >
                                Share in a post
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-[#666666] hover:bg-gray-50"
                        >
                          <Send className="h-4 w-4" />
                          <span className="hidden sm:inline">Send</span>
                        </button>
                      </div>
                    </div>

                    {showComments && (
                      <div className="border-t border-gray-200 p-4">
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-3">
                              <img
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="h-9 w-9 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="rounded-[18px] bg-[#f3f2ef] px-3 py-2">
                                  <div className="text-sm font-semibold text-[#191919]">
                                    {comment.author.name}
                                  </div>
                                  <div className="text-sm text-[#191919]">{comment.text}</div>
                                </div>
                                <div className="mt-1 flex items-center gap-3 pl-3 text-xs text-[#666666]">
                                  <button
                                    type="button"
                                    onClick={() => toggleCommentLike(post.id, comment.id)}
                                    className={cx(comment.liked && "text-[#0a66c2]")}
                                  >
                                    Like
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCommentDraftByPostId((prev) => ({
                                        ...prev,
                                        [post.id]: `${(prev[post.id] || "").trim()} @${comment.author.name} `,
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

                        <div className="mt-4 flex items-start gap-3">
                          <img
                            src={viewer.avatar}
                            alt={viewer.name}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                value={commentDraftByPostId[post.id] || ""}
                                onChange={(event) =>
                                  setCommentDraftByPostId((prev) => ({
                                    ...prev,
                                    [post.id]: event.target.value.slice(0, 3000),
                                  }))
                                }
                                placeholder="Add a comment..."
                                className="h-10 flex-1 rounded-full border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                              />
                              <button
                                type="button"
                                onClick={() => submitComment(post.id)}
                                disabled={!((commentDraftByPostId[post.id] || "").trim().length > 0)}
                                className={cx(
                                  "rounded-full px-4 py-2 text-sm font-semibold",
                                  (commentDraftByPostId[post.id] || "").trim().length > 0
                                    ? "bg-[#0a66c2] text-white hover:bg-[#004182]"
                                    : "cursor-not-allowed bg-gray-200 text-gray-500"
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
                </AnimatedPost>
              );
            })}
        </section>

        <aside className="hidden space-y-4 lg:block lg:sticky lg:top-[72px] lg:h-fit">
          <div className="linkedin-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold text-[#191919]">LinkedIn News</h2>
              <Info className="h-4 w-4 text-[#666666]" />
            </div>
            <div className="mt-4 space-y-4">
              {NEWS_ITEMS.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="block w-full text-left hover:bg-gray-50"
                >
                  <div className="text-sm font-semibold text-[#191919]">{item.title}</div>
                  <div className="mt-1 text-xs text-[#666666]">{item.meta}</div>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#666666] hover:text-[#191919]"
            >
              Show more
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="linkedin-surface p-4">
            <div className="text-base font-semibold text-[#191919]">Today's puzzles</div>
            <div className="mt-3 space-y-3">
              {PUZZLES.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left hover:bg-gray-50"
                >
                  <span>
                    <div className="text-sm font-semibold text-[#191919]">{item.name}</div>
                    <div className="text-xs text-[#666666]">{item.hint}</div>
                  </span>
                  <ChevronDown className="-rotate-90 h-4 w-4 text-[#666666]" />
                </button>
              ))}
            </div>
          </div>

          <div className="linkedin-surface p-4">
            <div className="text-xs uppercase tracking-[0.12em] text-[#666666]">
              Promoted
            </div>
            <div className="mt-2 text-sm leading-5 text-[#191919]">
              Land more interviews with sharper profile insights and easier networking.
            </div>
            <button
              type="button"
              className="mt-4 rounded-full border border-[#0a66c2] px-4 py-2 text-sm font-semibold text-[#0a66c2]"
            >
              Try Premium
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#666666]">
              <BarChart3 className="h-4 w-4" />
              Track profile views, search appearances, and hiring momentum.
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

            {/* AI Assistant Panel */}
            {showAiPanel && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    AI Writing Assistant
                  </span>
                </div>

                {!aiGeneratedText && !aiGenerating && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      What do you want to post about?
                    </p>
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Share my thoughts on remote work..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAiGenerate}
                        disabled={!aiPrompt.trim()}
                        className={cx(
                          "px-4 py-2 rounded-full text-sm font-medium",
                          aiPrompt.trim()
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        )}
                      >
                        ✨ Generate
                      </button>
                      <button
                        onClick={() => {
                          setShowAiPanel(false);
                          setAiPrompt("");
                        }}
                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {(aiGenerating || displayedText) && (
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap min-h-[60px]">
                        {displayedText}
                        {aiGenerating && (
                          <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse" />
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAiUse}
                        disabled={aiGenerating}
                        className={cx(
                          "px-4 py-2 rounded-full text-sm font-medium",
                          aiGenerating
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        )}
                      >
                        Use this
                      </button>
                      <button
                        onClick={handleAiRegenerate}
                        disabled={aiGenerating}
                        className={cx(
                          "px-4 py-2 rounded-full text-sm font-medium border",
                          aiGenerating
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        🔄 Regenerate
                      </button>
                      <button
                        onClick={() => {
                          setShowAiPanel(false);
                          setAiPrompt("");
                          setAiGeneratedText("");
                          setDisplayedText("");
                        }}
                        disabled={aiGenerating}
                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
              <div className="flex items-center gap-1">
                {[
                  { label: "Add photo", icon: Image, color: "text-[#378fe9]" },
                  { label: "Add video", icon: Video, color: "text-[#5f9b41]" },
                  { label: "Create event", icon: Calendar, color: "text-[#c37d16]" },
                  { label: "Write article", icon: Newspaper, color: "text-[#e06847]" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                    title={item.label}
                  >
                    <item.icon className={cx("h-5 w-5", item.color)} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!canPost}
                onClick={submitPost}
                className={cx(
                  "rounded-full px-5 py-2 text-sm font-semibold",
                  canPost
                    ? "bg-[#0a66c2] text-white hover:bg-[#004182]"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
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

// Animated Post Component with scroll reveal
function AnimatedPost({ children, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );
}
