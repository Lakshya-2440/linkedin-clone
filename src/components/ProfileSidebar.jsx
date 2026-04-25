import { Link } from "react-router-dom";
import { Bookmark, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileSidebar() {
  const { currentUser } = useAuth();

  const profile = currentUser || {
    id: "1",
    name: "LinkedIn Member",
    headline: "Building a professional network",
    avatar: "https://i.pravatar.cc/150?img=12",
    connections: 312,
  };

  return (
    <div className="space-y-4">
      <div className="linkedin-surface overflow-hidden">
        <div className="h-16 bg-[linear-gradient(135deg,#70b5f9,#0a66c2)]" />
        <div className="px-4 pb-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="-mt-8 h-[72px] w-[72px] rounded-full border-2 border-white object-cover"
          />
          <Link
            to={`/profile/${profile.id}`}
            className="mt-3 block text-base font-semibold text-[#191919] hover:underline"
          >
            {profile.name}
          </Link>
          <p className="mt-1 text-sm leading-5 text-[#666666]">{profile.headline}</p>

          <div className="mt-4 border-t border-gray-200 pt-3 text-xs">
            <button
              type="button"
              className="flex w-full items-center justify-between py-1.5 text-left text-[#666666]"
            >
              <span>Connections</span>
              <span className="font-semibold text-[#0a66c2]">
                {profile.connections ?? 312}
              </span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between py-1.5 text-left text-[#666666]"
            >
              <span>Who viewed your profile</span>
              <span className="font-semibold text-[#0a66c2]">42</span>
            </button>
          </div>
        </div>
      </div>

      <div className="linkedin-surface p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#191919]">
          <Users className="h-4 w-4 text-[#666666]" />
          Manage network
        </div>
        <Link to="/network" className="mt-3 block text-sm text-[#0a66c2] hover:underline">
          View all connections
        </Link>
        <Link to="/jobs" className="mt-2 block text-sm text-[#0a66c2] hover:underline">
          Job updates
        </Link>
        <Link
          to="/settings"
          className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#191919] hover:underline"
        >
          <Bookmark className="h-4 w-4 text-[#666666]" />
          Saved items
        </Link>
      </div>
    </div>
  );
}
