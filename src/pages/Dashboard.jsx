import { useState } from "react";
import {
  FaBolt,
  FaCheckCircle,
  FaClipboardList,
  FaPlus,
  FaSpinner,
} from "react-icons/fa";
import HeroDashboard from "../components/HeroDashboard";
import KanbanBoard from "../components/KanbanBoard";
import StatCard from "../components/StatCard";
import TaskModal from "../components/TaskModal";
import UserPanel from "../components/UserPanel";
import useTasks from "../hooks/useTasks";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { stats, isLoading, error, reloadTasks } = useTasks();

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <UserPanel />

        <div className="relative">
          <HeroDashboard />

          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-3 text-sm font-black text-slate-950 shadow-xl shadow-teal-500/20 transition hover:bg-teal-200 sm:right-7 sm:top-7"
          >
            <FaPlus />
            Nueva tarea
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100 sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>
          <button
            onClick={reloadTasks}
            className="rounded-lg bg-red-400 px-4 py-2 font-bold text-red-950"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total tareas"
          value={stats.total}
          icon={<FaClipboardList />}
          accent="teal"
        />
        <StatCard
          title="En progreso"
          value={stats.inProgress}
          icon={<FaSpinner />}
          accent="blue"
        />
        <StatCard
          title="Completadas"
          value={stats.completed}
          icon={<FaCheckCircle />}
          accent="green"
        />
        <StatCard
          title="Alta prioridad"
          value={stats.urgent}
          icon={<FaBolt />}
          accent="amber"
        />
      </div>

      <section className="mt-6">
        <KanbanBoard isLoading={isLoading} />
      </section>

      {isModalOpen && <TaskModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Dashboard;
