import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import useTasks from "../hooks/useTasks";

const statusOrder = ["backlog", "progress", "review", "done"];

const priorities = {
  high: "bg-red-400/15 text-red-200 border-red-300/20",
  medium: "bg-amber-300/15 text-amber-100 border-amber-300/20",
  low: "bg-emerald-300/15 text-emerald-100 border-emerald-300/20",
};

const priorityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

function TaskCard({ task }) {
  const { editTask, removeTask } = useTasks();
  const currentIndex = statusOrder.indexOf(task.status);
  const canMoveBack = currentIndex > 0;
  const canMoveNext = currentIndex < statusOrder.length - 1;

  function moveTask(direction) {
    const nextStatus = statusOrder[currentIndex + direction];
    if (nextStatus) {
      editTask(task.id, { status: nextStatus });
    }
  }

  return (
    <motion.article
      layout
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className="group rounded-lg border border-white/10 bg-[#111522] p-4 shadow-lg shadow-black/20 transition hover:border-teal-300/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black leading-6 text-white">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {task.description || "Sin descripcion."}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg border px-2.5 py-1 text-xs font-black ${
            priorities[task.priority] || priorities.medium
          }`}
        >
          {priorityLabels[task.priority] || "Media"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="rounded-md bg-white/[0.06] px-2.5 py-1">
          {task.owner || "Sin owner"}
        </span>
        {task.dueDate && (
          <span className="rounded-md bg-white/[0.06] px-2.5 py-1">
            {task.dueDate}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Mover tarea hacia atras"
            disabled={!canMoveBack}
            onClick={() => moveTask(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            aria-label="Mover tarea hacia adelante"
            disabled={!canMoveNext}
            onClick={() => moveTask(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <FaArrowRight />
          </button>
        </div>

        <button
          type="button"
          aria-label="Eliminar tarea"
          onClick={() => removeTask(task.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-red-300/50 hover:text-red-200"
        >
          <FaTrash />
        </button>
      </div>
    </motion.article>
  );
}

export default TaskCard;
