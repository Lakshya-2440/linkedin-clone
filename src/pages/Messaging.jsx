import { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  Edit3,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Send,
  Paperclip,
  Image,
  Smile,
  FileText,
  ChevronLeft,
  X,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery.js";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              STATIC DATA                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */

const CURRENT_USER = {
  id: "me",
  name: "Demo User",
  avatar: "https://i.pravatar.cc/150?img=60",
};

const CONTACTS_DATA = [
  {
    id: 1,
    name: "Shubham Kumar",
    headline: "Senior Software Engineer at Google",
    avatar: "https://i.pravatar.cc/150?img=11",
    isOnline: true,
    unreadCount: 2,
    lastMessage: {
      text: "Thanks for connecting! I'd love to discuss the opportunity at your company.",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hi Demo, I came across your profile and was impressed by your experience in React development.",
        sender: "them",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 2,
        text: "We're currently looking for a Senior Frontend Developer at Google. Would you be open to a quick chat about the role?",
        sender: "them",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 60000),
        reactions: [],
      },
      {
        id: 3,
        text: "Hi Shubham, thanks for reaching out! I'd be happy to learn more about the opportunity.",
        sender: "me",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 4,
        text: "Thanks for connecting! I'd love to discuss the opportunity at your company.",
        sender: "them",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 2,
    name: "Priya Sharma",
    headline: "Product Manager at Microsoft",
    avatar: "https://i.pravatar.cc/150?img=5",
    isOnline: true,
    unreadCount: 0,
    lastMessage: {
      text: "The product demo went great! Let's schedule a follow-up.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hey Priya, just wanted to check in about the product demo scheduled for tomorrow.",
        sender: "me",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        reactions: ["👍"],
      },
      {
        id: 2,
        text: "All set! Looking forward to showing you what we've built.",
        sender: "them",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "The product demo went great! Let's schedule a follow-up.",
        sender: "them",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 3,
    name: "Rahul Verma",
    headline: "UX Designer at Adobe",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOnline: false,
    unreadCount: 5,
    lastMessage: {
      text: "I've sent over the Figma files. Let me know your thoughts!",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hi Rahul, can you share the latest mockups for the landing page redesign?",
        sender: "me",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 2,
        text: "Sure! I've been working on a few variations based on your feedback.",
        sender: "them",
        timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "I've sent over the Figma files. Let me know your thoughts!",
        sender: "them",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 4,
    name: "Ananya Patel",
    headline: "Marketing Director at Flipkart",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true,
    unreadCount: 0,
    lastMessage: {
      text: "Looking forward to our meeting next week!",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isOwn: true,
    },
    messages: [
      {
        id: 1,
        text: "Hi Ananya, thanks for connecting! I'm interested in learning more about marketing opportunities at Flipkart.",
        sender: "me",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 2,
        text: "Great to connect! We have some exciting openings. Would you be available for a call next week?",
        sender: "them",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "Tuesday works for me. What time?",
        sender: "me",
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 4,
        text: "How about 2 PM IST?",
        sender: "them",
        timestamp: new Date(Date.now() - 17 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 5,
        text: "Perfect! I'll add it to my calendar.",
        sender: "me",
        timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
        reactions: ["👍"],
      },
      {
        id: 6,
        text: "Looking forward to our meeting next week!",
        sender: "me",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 5,
    name: "Vikram Singh",
    headline: "Data Scientist at Amazon",
    avatar: "https://i.pravatar.cc/150?img=7",
    isOnline: false,
    unreadCount: 1,
    lastMessage: {
      text: "Can you review the analysis I shared?",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hey Vikram, I saw your post about machine learning frameworks. Great insights!",
        sender: "me",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        reactions: ["🙏"],
      },
      {
        id: 2,
        text: "Thanks! Been working on a project using TensorFlow. Would love to get your thoughts.",
        sender: "them",
        timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "Can you review the analysis I shared?",
        sender: "them",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 6,
    name: "Neha Gupta",
    headline: "HR Manager at Infosys",
    avatar: "https://i.pravatar.cc/150?img=9",
    isOnline: true,
    unreadCount: 0,
    lastMessage: {
      text: "Your interview is scheduled for Friday at 10 AM.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hi Neha, I applied for the Frontend Developer position last week.",
        sender: "me",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 2,
        text: "Thanks for your application! We'd like to invite you for an interview.",
        sender: "them",
        timestamp: new Date(Date.now() - 70 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "That's great news! When would be a good time?",
        sender: "me",
        timestamp: new Date(Date.now() - 68 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 4,
        text: "Your interview is scheduled for Friday at 10 AM.",
        sender: "them",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 7,
    name: "Karan Malhotra",
    headline: "Startup Founder at TechVentures",
    avatar: "https://i.pravatar.cc/150?img=15",
    isOnline: false,
    unreadCount: 0,
    lastMessage: {
      text: "Let me know if you're interested in joining our team!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hi Karan, I read about your startup in TechCrunch. Impressive growth!",
        sender: "me",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 2,
        text: "Thanks! We're actually hiring engineers right now. Are you open to new opportunities?",
        sender: "them",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "I'm always open to interesting opportunities. Tell me more about the role.",
        sender: "me",
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 4,
        text: "We're building the next generation of fintech products. Looking for someone with your React expertise.",
        sender: "them",
        timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 5,
        text: "Let me know if you're interested in joining our team!",
        sender: "them",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        reactions: [],
      },
    ],
  },
  {
    id: 8,
    name: "Sneha Gupta",
    headline: "Engineering Manager at Netflix",
    avatar: "https://i.pravatar.cc/150?img=10",
    isOnline: true,
    unreadCount: 3,
    lastMessage: {
      text: "Can we reschedule our 1:1 to Thursday?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
      isOwn: false,
    },
    messages: [
      {
        id: 1,
        text: "Hi Sneha, I'm excited to start next week!",
        sender: "me",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        reactions: ["🎉"],
      },
      {
        id: 2,
        text: "Welcome to the team! We're thrilled to have you.",
        sender: "them",
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        reactions: [],
      },
      {
        id: 3,
        text: "Can we reschedule our 1:1 to Thursday?",
        sender: "them",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        reactions: [],
      },
    ],
  },
];

const AUTO_REPLIES = [
  "Thanks for the message! I'll get back to you soon.",
  "That sounds great! Let me think about it.",
  "Interesting point. Can you elaborate more?",
  "I agree with your perspective on this.",
  "Let me check my calendar and get back to you.",
  "Sounds like a plan! 👍",
  "I appreciate you reaching out.",
  "That's exactly what I was thinking!",
];

const EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "🎉", "🔥"];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              MAIN COMPONENT                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Messaging() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // State
  const [conversations, setConversations] = useState(CONTACTS_DATA);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("focused"); // "focused" | "other"
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeSearch, setComposeSearch] = useState("");
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Derived state
  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId),
    [conversations, activeConversationId]
  );

  const filteredConversations = useMemo(() => {
    let filtered = conversations;
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Sort by most recent
    return filtered.sort(
      (a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp
    );
  }, [conversations, searchQuery]);

  const filteredContacts = useMemo(() => {
    if (!composeSearch) return [];
    return CONTACTS_DATA.filter((c) =>
      c.name.toLowerCase().includes(composeSearch.toLowerCase())
    );
  }, [composeSearch]);

  // Auto-scroll to bottom when messages change or typing stops
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, isTyping]);

  // Send message
  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "me",
      timestamp: new Date(),
      reactions: [],
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: {
                text: messageInput,
                timestamp: new Date(),
                isOwn: true,
              },
            }
          : conv
      )
    );

    setMessageInput("");

    // Simulate typing and reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyText =
          AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
        const replyMessage = {
          id: Date.now() + 1,
          text: replyText,
          sender: "them",
          timestamp: new Date(),
          reactions: [],
        };
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, replyMessage],
                  lastMessage: {
                    text: replyText,
                    timestamp: new Date(),
                    isOwn: false,
                  },
                  unreadCount: 0,
                }
              : conv
          )
        );
      }, 2500);
    }, 500);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Add reaction
  const addReaction = (messageId, emoji) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, reactions: [...msg.reactions, emoji] }
                  : msg
              ),
            }
          : conv
      )
    );
    setShowEmojiPicker(null);
  };

  // Format timestamp
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Format message time
  const formatMessageTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get date separator
  const getDateLabel = (date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const msgDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (msgDate.getTime() === today.getTime()) return "Today";
    if (msgDate.getTime() === yesterday.getTime()) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    if (!activeConversation) return [];
    const groups = [];
    let currentGroup = null;

    activeConversation.messages.forEach((msg) => {
      const dateLabel = getDateLabel(msg.timestamp);
      if (!currentGroup || currentGroup.dateLabel !== dateLabel) {
        currentGroup = { dateLabel, messages: [] };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(msg);
    });

    return groups;
  }, [activeConversation]);

  // Start new conversation
  const startConversation = (contact) => {
    setActiveConversationId(contact.id);
    setShowComposeModal(false);
    setComposeSearch("");
    setMobileChatOpen(true);
  };

  return (
    <div className="mx-auto max-w-[1128px] px-0 sm:px-4">
      <div className="bg-gray-100 dark:bg-gray-900 sm:rounded-xl sm:border sm:border-gray-200 sm:dark:border-gray-700 overflow-hidden flex h-[calc(100vh-128px)] sm:h-[calc(100vh-120px)]">
      {/* LEFT PANEL */}
      <aside
        className={`w-full lg:w-[35%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col ${
          !isDesktop && mobileChatOpen ? "hidden" : ""
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Messaging</h1>
          <button
            onClick={() => setShowComposeModal(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="New message"
          >
            <Edit3 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 border border-transparent rounded-lg text-sm focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("focused")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "focused"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            }`}
          >
            Focused
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "other"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            }`}
          >
            Other
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setActiveConversationId(conv.id);
                if (!isDesktop) setMobileChatOpen(true);
              }}
              className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
                activeConversationId === conv.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex gap-3">
                {/* Avatar with online indicator */}
                <div className="relative shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0">
                      {formatTime(conv.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-300 truncate mb-1">
                    {conv.headline}
                  </p>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm truncate ${
                        conv.unreadCount > 0 && !conv.lastMessage.isOwn
                          ? "text-gray-900 dark:text-gray-100 font-medium"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      {conv.lastMessage.isOwn && "You: "}
                      {conv.lastMessage.text}
                    </p>
                    {conv.unreadCount > 0 && !conv.lastMessage.isOwn && (
                      <span className="ml-2 shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main
        className={`flex-1 flex flex-col bg-white dark:bg-gray-900 ${
          isDesktop ? "hidden lg:flex" : mobileChatOpen ? "flex" : "hidden"
        }`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {!isDesktop && (
                  <button
                    type="button"
                    onClick={() => setMobileChatOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-100"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="relative">
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {activeConversation.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                    {activeConversation.name}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {activeConversation.headline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Info className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950">
              {groupedMessages.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Date Separator */}
                  <div className="flex justify-center my-4">
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-200 text-xs rounded-full">
                      {group.dateLabel}
                    </span>
                  </div>

                  {/* Messages */}
                  {group.messages.map((msg, msgIndex) => {
                    const isOwn = msg.sender === "me";
                    const showAvatar =
                      !isOwn &&
                      (msgIndex === 0 ||
                        group.messages[msgIndex - 1].sender !== "them");
                    const isLastMessage =
                      groupIndex === groupedMessages.length - 1 &&
                      msgIndex === group.messages.length - 1 &&
                      isOwn;

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 mb-4 ${
                          isOwn ? "justify-end" : "justify-start"
                        }`}
                        onMouseEnter={() => setHoveredMessageId(msg.id)}
                        onMouseLeave={() => {
                          setHoveredMessageId(null);
                          setShowEmojiPicker(null);
                        }}
                      >
                        {!isOwn && (
                          <img
                            src={activeConversation.avatar}
                            alt={activeConversation.name}
                            className={`w-8 h-8 rounded-full object-cover shrink-0 ${
                              !showAvatar ? "invisible" : ""
                            }`}
                          />
                        )}

                        <div
                          className={`relative max-w-[70%] group ${
                            isOwn ? "order-1" : "order-2"
                          }`}
                        >
                          {/* Message Bubble */}
                          <div
                            className={`px-4 py-2.5 rounded-2xl ${
                              isOwn
                                ? "bg-blue-600 text-white rounded-br-md"
                                : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>

                          {/* Reactions */}
                          {msg.reactions.length > 0 && (
                            <div
                              className={`flex gap-1 mt-1 ${
                                isOwn ? "justify-end" : "justify-start"
                              }`}
                            >
                              {msg.reactions.map((reaction, idx) => (
                                <span
                                  key={idx}
                                  className="text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-1.5 py-0.5 shadow-sm"
                                >
                                  {reaction}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Timestamp & Read Receipt */}
                          <div
                            className={`flex items-center gap-1 mt-1 ${
                              isOwn ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              {formatMessageTime(msg.timestamp)}
                            </span>
                            {isLastMessage && (
                              <CheckCheck className="w-4 h-4 text-blue-500" />
                            )}
                          </div>

                          {/* Emoji Reaction Button */}
                          {hoveredMessageId === msg.id && (
                            <div
                              className={`absolute ${
                                isOwn ? "left-0" : "right-0"
                              } ${isOwn ? "-translate-x-full" : "translate-x-full"} top-0 flex items-center gap-1 bg-white border border-gray-200 rounded-full shadow-lg px-1 py-1 z-10`}
                            >
                              {showEmojiPicker === msg.id ? (
                                EMOJI_OPTIONS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => addReaction(msg.id, emoji)}
                                    className="w-7 h-7 hover:bg-gray-100 rounded flex items-center justify-center text-lg transition-colors"
                                  >
                                    {emoji}
                                  </button>
                                ))
                              ) : (
                                <button
                                  onClick={() => setShowEmojiPicker(msg.id)}
                                  className="w-7 h-7 hover:bg-gray-100 rounded flex items-center justify-center"
                                >
                                  <Smile className="w-4 h-4 text-gray-500" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 mb-4">
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 mr-2">
                        {activeConversation.name.split(" ")[0]} is typing
                      </span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Image className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Smile className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
              </div>

              {/* Input */}
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a message..."
                  rows={1}
                  className="flex-1 resize-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[44px] max-h-[120px]"
                  style={{ height: "auto" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    messageInput.trim()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowComposeModal(false);
              setComposeSearch("");
            }}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-slideUp border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                New message
              </h2>
              <button
                onClick={() => {
                  setShowComposeModal(false);
                  setComposeSearch("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">To:</span>
                <input
                  type="text"
                  placeholder="Type a name"
                  value={composeSearch}
                  onChange={(e) => setComposeSearch(e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
              {composeSearch ? (
                filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => startConversation(contact)}
                      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {contact.headline}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-300">
                    No contacts found
                  </div>
                )
              ) : (
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Recent contacts
                  </p>
                  {conversations.slice(0, 5).map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => startConversation(contact)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left rounded-lg"
                    >
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {contact.headline}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

