import KanbanColumn from "./KanbanColumn";
import useTasks from "../hooks/useTasks";

const columns = [
  {
    title: "Backlog",
    status: "backlog",
    helper: "Ideas listas para priorizar",
  },
  {
    title: "En progreso",
    status: "progress",
    helper: "Trabajo activo del sprint",
  },
  {
    title: "Review",
    status: "review",
    helper: "Pendiente de validacion",
  },
  {
    title: "Done",
    status: "done",
    helper: "Entregado y cerrado",
  },
];

function KanbanBoard({ isLoading }) {
  const { tasks } = useTasks();

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.status}
            className="min-h-[420px] animate-pulse rounded-lg border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          helper={column.helper}
          status={column.status}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
