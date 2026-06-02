import { useContext } from "react";
import TaskContext from "../context/TaskContext";

function useTasks() {
  return useContext(TaskContext);
}

export default useTasks;