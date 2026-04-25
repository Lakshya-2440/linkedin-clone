import { useMemo, useState } from "react";
import {
  BellOff,
  CheckCheck,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useNotification } from "../contexts/NotificationContext";
import ProfileSidebar from "../components/ProfileSidebar";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Mentions", value: "mentions" },
  { label: "Jobs", value: "jobs" },
];

function NotificationRow({ notification, onRead, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article
      className={`relative flex gap-3 border-b border-gray-200 px-4 py-4 transition-colors hover:bg-gray-50 ${
        notification.unread ? "bg-[#edf3f8]" : "bg-white"
      }`}
      onClick={() => {
        if (notification.unread) onRead(notification.id);
      }}
    >
      <div className="relative pt-1">
        {notification.unread && (
          <span className="absolute -left-3 top-5 h-2.5 w-2.5 rounded-full bg-[#0a66c2]" />
        )}
        <img
          src={notification.avatar}
          alt=""
          className="h-12 w-12 rounded-full border border-gray-200 object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6 text-[#191919]">{notification.text}</p>
        <p className="mt-1 text-xs text-[#666666]">{notification.timestamp}</p>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen((current) => !current);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-white"
          aria-label="Notification actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-10 z-10 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(notification.id);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#191919] hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 text-gray-500" />
              Delete
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#191919] hover:bg-gray-50"
            >
              <BellOff className="h-4 w-4 text-gray-500" />
              Turn off
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Notifications() {
  const { notifications, markAllAsRead, markAsRead, deleteNotification } =
    useNotification();
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          activeTab === "all" || notification.type === activeTab
      ),
    [activeTab, notifications]
  );

  const newNotifications = filteredNotifications.filter(
    (notification) => notification.group === "new"
  );
  const earlierNotifications = filteredNotifications.filter(
    (notification) => notification.group === "earlier"
  );

  return (
    <div className="linkedin-page">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[225px_minmax(0,1fr)]">
        <aside className="hidden lg:block lg:sticky lg:top-[72px] lg:h-fit">
          <ProfileSidebar />
        </aside>

        <main className="space-y-4">
          <div className="linkedin-surface p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[#191919]">Notifications</h1>
                <p className="mt-1 text-sm text-[#666666]">
                  Keep up with mentions, job activity, and network updates.
                </p>
              </div>

              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a66c2]"
              >
                <CheckCheck className="h-4 w-4" />
                Mark all as read
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveTab(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === filter.value
                      ? "bg-[#057642] text-white"
                      : "border border-gray-300 bg-white text-[#191919] hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="linkedin-surface overflow-hidden">
            {newNotifications.length > 0 && (
              <section>
                <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">
                  New
                </div>
                {newNotifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </section>
            )}

            {earlierNotifications.length > 0 && (
              <section>
                <div className="border-b border-t border-gray-200 bg-[#f8fafc] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">
                  Earlier
                </div>
                {earlierNotifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </section>
            )}

            {filteredNotifications.length === 0 && (
              <div className="px-4 py-14 text-center text-sm text-[#666666]">
                No notifications in this view.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
