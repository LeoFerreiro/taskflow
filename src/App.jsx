import { useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Teams from "./pages/Teams";

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import useAuth from "./hooks/useAuth";

const pages = {
  dashboard: <Dashboard />,
  tasks: <Tasks />,
  teams: <Teams />,
  profile: <Profile />,
};

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

function AuthenticatedApp() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [authMode, setAuthMode] = useState("register");
  const { currentUser } = useAuth();

  if (!currentUser) {
    return authMode === "register" ? (
      <Register onSwitchMode={() => setAuthMode("login")} />
    ) : (
      <Login onSwitchMode={() => setAuthMode("register")} />
    );
  }

  return (
    <TaskProvider>
      <DashboardLayout
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        {pages[activeSection]}
      </DashboardLayout>
    </TaskProvider>
  );
}

export default App;
