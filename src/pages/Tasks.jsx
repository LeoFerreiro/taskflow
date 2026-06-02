import { useMemo, useState } from "react";
import { FaFilter, FaPlus, FaRotateRight } from "react-icons/fa6";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";
import useTasks from "../hooks/useTasks";

const statusLabels = {
  all: "Todos",
  backlog: "Backlog",
  progress: "En progreso",
  review: "Review",
  done: "Done",
};

const priorityLabels = {
  all: "Todas",
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

function Tasks() {
  const { tasks, isLoading, reloadTasks, editTask, removeTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [query, setQuery] = useState("");

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus = status === "all" || task.status === status;
      const matchesPriority = priority === "all" || task.priority === priority;
      const matchesQuery =
        !normalizedQuery ||
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.description.toLowerCase().includes(normalizedQuery) ||
        task.owner.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesPriority && matchesQuery;
    });
  }, [priority, query, status, tasks]);

  return (
    <>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
              Tareas
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Centro operativo del sprint
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Filtra, revisa y actualiza las tareas del equipo sin salir del flujo.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reloadTasks}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-teal-300/50 hover:text-teal-200"
            >
              <FaRotateRight />
              Actualizar
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-teal-200"
            >
              <FaPlus />
              Nueva tarea
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <input
            type="search"
            placeholder="Buscar por titulo, descripcion u owner"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
          />

          <label className="relative">
            <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-teal-300/60"
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="relative">
            <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-teal-300/60"
            >
              {Object.entries(priorityLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
        <div className="grid grid-cols-[1.4fr_110px_130px_120px_120px] gap-4 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500 max-xl:hidden">
          <span>Tarea</span>
          <span>Prioridad</span>
          <span>Estado</span>
          <span>Owner</span>
          <span>Acciones</span>
        </div>

        <div className="divide-y divide-white/10">
          {isLoading ? (
            <div className="p-6 text-sm text-slate-400">Cargando tareas...</div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <article
                key={task.id}
                className="grid gap-4 px-5 py-4 transition hover:bg-white/[0.03] xl:grid-cols-[1.4fr_110px_130px_120px_120px] xl:items-center"
              >
                <div>
                  <h2 className="font-black">{task.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {task.description || "Sin descripcion."}
                  </p>
                </div>

                <span className="w-fit rounded-lg bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-200">
                  {priorityLabels[task.priority] || "Media"}
                </span>

                <select
                  value={task.status}
                  onChange={(event) =>
                    editTask(task.id, { status: event.target.value })
                  }
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                >
                  {Object.entries(statusLabels)
                    .filter(([value]) => value !== "all")
                    .map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </select>

                <span className="text-sm font-semibold text-slate-300">
                  {task.owner || "Sin owner"}
                </span>

                <button
                  type="button"
                  onClick={() => removeTask(task.id)}
                  className="w-fit rounded-lg border border-red-300/20 px-3 py-2 text-sm font-bold text-red-200 transition hover:bg-red-400/10"
                >
                  Eliminar
                </button>
              </article>
            ))
          ) : (
            <div className="p-6 text-sm text-slate-400">
              No hay tareas que coincidan con los filtros.
            </div>
          )}
        </div>
      </section>

      <section className="mt-6">
        <KanbanBoard isLoading={isLoading} />
      </section>

      {isModalOpen && <TaskModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Tasks;
