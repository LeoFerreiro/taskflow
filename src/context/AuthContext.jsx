import { createContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();
const sessionKey = "taskflow-session";

function getStoredSession() {
  try {
    localStorage.removeItem(sessionKey);
    return JSON.parse(sessionStorage.getItem(sessionKey));
  } catch {
    return null;
  }
}

function saveSession(session) {
  sessionStorage.setItem(sessionKey, JSON.stringify(session));
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getStoredSession);

  async function register(payload) {
    const nextSession = await registerUser(payload);
    setSession(nextSession);
    saveSession(nextSession);
  }

  async function login(payload) {
    const nextSession = await loginUser(payload);
    setSession(nextSession);
    saveSession(nextSession);
  }

  function logout() {
    localStorage.removeItem(sessionKey);
    sessionStorage.removeItem(sessionKey);
    setSession(null);
  }

  const value = useMemo(
    () => ({
      currentUser: session?.user || null,
      token: session?.token || null,
      register,
      login,
      logout,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
