import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </TaskProvider>
  );
}

export default App;