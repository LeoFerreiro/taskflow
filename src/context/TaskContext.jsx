import { createContext, useEffect, useMemo, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setIsLoading(true);
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Initial API hydration belongs in this provider so the dashboard stays data-driven.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  async function addTask(task) {
    const nextTask = await createTask(task);
    setTasks((prev) => [nextTask, ...prev]);
  }

  async function editTask(id, updates) {
    const updatedTask = await updateTask(id, updates);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );
  }

  async function removeTask(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "done").length;
    const inProgress = tasks.filter((task) => task.status === "progress").length;
    const urgent = tasks.filter((task) => task.priority === "high").length;

    return {
      total: tasks.length,
      completed,
      inProgress,
      urgent,
    };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        isLoading,
        error,
        addTask,
        editTask,
        removeTask,
        reloadTasks: loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
