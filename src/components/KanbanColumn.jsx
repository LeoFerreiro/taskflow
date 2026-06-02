import TaskCard from "./TaskCard";

function KanbanColumn({ title, helper, status, tasks }) {
  return (
    <div className="flex min-h-[520px] flex-col rounded-lg border border-white/10 bg-white/[0.035] shadow-xl shadow-black/15 backdrop-blur">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-black tracking-tight">{title}</h2>
            <p className="mt-1 text-xs text-slate-500">{helper}</p>
          </div>

          <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-black/25 px-2 text-xs font-black text-teal-200">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3 p-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/10 px-5 text-center text-sm text-slate-500">
            Sin tareas en {status}.
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
