import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AUTH_STORAGE_KEY = "linkedin-clone-auth-user";

const fallbackUser = {
  id: "1",
  name: "LinkedIn Member",
  headline: "Building a professional network",
  avatar: "https://i.pravatar.cc/150?img=12",
  connections: 312,
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(currentUser));

  const login = (userData) => {
    const nextUser = {
      ...fallbackUser,
      ...userData,
      name:
        `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim() ||
        userData?.name ||
        fallbackUser.name,
    };

    setCurrentUser(nextUser);
    setIsLoggedIn(true);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser,
      login,
      logout,
    }),
    [currentUser, isLoggedIn]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
