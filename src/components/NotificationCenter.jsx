import { useMemo, useState } from "react";
import {
  FaBell,
  FaCheck,
  FaCircleExclamation,
  FaClock,
  FaCodePullRequest,
  FaFire,
  FaXmark,
} from "react-icons/fa6";
import useTasks from "../hooks/useTasks";

const storageKey = "taskflow-read-notifications";
const today = new Date();

function getReadNotifications() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveReadNotifications(ids) {
  localStorage.setItem(storageKey, JSON.stringify(ids));
}

function getDaysUntil(date) {
  const dueDate = new Date(`${date}T00:00:00`);
  const currentDate = new Date(today.toDateString());
  const difference = dueDate.getTime() - currentDate.getTime();

  return Math.ceil(difference / 86400000);
}

function NotificationCenter({ setActiveSection }) {
  const { tasks, error } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState(getReadNotifications);

  const notifications = useMemo(() => {
    const taskNotifications = [];

    if (error) {
      taskNotifications.push({
        id: "api-error",
        title: "API sin respuesta",
        description: error,
        tone: "red",
        icon: <FaCircleExclamation />,
        action: "Revisar tareas",
      });
    }

    tasks.forEach((task) => {
      const daysUntilDue = task.dueDate ? getDaysUntil(task.dueDate) : null;

      if (daysUntilDue !== null && daysUntilDue < 0 && task.status !== "done") {
        taskNotifications.push({
          id: `overdue-${task.id}`,
          title: "Tarea vencida",
          description: `${task.title} tenia fecha limite ${task.dueDate}.`,
          tone: "red",
          icon: <FaClock />,
          action: "Ir a tareas",
        });
      }

      if (
        daysUntilDue !== null &&
        daysUntilDue >= 0 &&
        daysUntilDue <= 2 &&
        task.status !== "done"
      ) {
        taskNotifications.push({
          id: `due-soon-${task.id}`,
          title: "Entrega cercana",
          description: `${task.title} vence en ${daysUntilDue} dia(s).`,
          tone: "amber",
          icon: <FaClock />,
          action: "Planificar",
        });
      }

      if (task.priority === "high" && task.status !== "done") {
        taskNotifications.push({
          id: `priority-${task.id}`,
          title: "Alta prioridad activa",
          description: `${task.title} necesita seguimiento del equipo.`,
          tone: "orange",
          icon: <FaFire />,
          action: "Ver tarea",
        });
      }

      if (task.status === "review") {
        taskNotifications.push({
          id: `review-${task.id}`,
          title: "Lista para review",
          description: `${task.title} espera validacion final.`,
          tone: "teal",
          icon: <FaCodePullRequest />,
          action: "Revisar",
        });
      }
    });

    return taskNotifications.slice(0, 8);
  }, [error, tasks]);

  const unreadCount = notifications.filter(
    (notification) => !readIds.includes(notification.id)
  ).length;

  function markAsRead(id) {
    setReadIds((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id];
      saveReadNotifications(next);
      return next;
    });
  }

  function markAllAsRead() {
    const next = notifications.map((notification) => notification.id);
    setReadIds(next);
    saveReadNotifications(next);
  }

  function openTasks() {
    setActiveSection("tasks");
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Notificaciones"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-teal-300/50 hover:text-teal-200"
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-300 px-1 text-[11px] font-black text-slate-950">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-[min(380px,calc(100vw-32px))] overflow-hidden rounded-lg border border-white/10 bg-[#111522] shadow-2xl shadow-black/50">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                Notificaciones
              </p>
              <h3 className="mt-1 text-lg font-black">
                {unreadCount} pendientes
              </h3>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Marcar todas como leidas"
                onClick={markAllAsRead}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200"
              >
                <FaCheck />
              </button>
              <button
                type="button"
                aria-label="Cerrar notificaciones"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200"
              >
                <FaXmark />
              </button>
            </div>
          </div>

          <div className="max-h-[430px] overflow-y-auto p-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const isRead = readIds.includes(notification.id);

                return (
                  <article
                    key={notification.id}
                    className={`rounded-lg border p-3 transition ${
                      isRead
                        ? "border-white/5 bg-white/[0.02] opacity-70"
                        : "border-white/10 bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          notification.tone === "red"
                            ? "bg-red-300 text-red-950"
                            : notification.tone === "amber"
                            ? "bg-amber-300 text-slate-950"
                            : notification.tone === "orange"
                            ? "bg-orange-300 text-slate-950"
                            : "bg-teal-300 text-slate-950"
                        }`}
                      >
                        {notification.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-black leading-5">
                            {notification.title}
                          </h4>
                          {!isRead && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-300" />
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-5 text-slate-400">
                          {notification.description}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={openTasks}
                            className="rounded-lg bg-teal-300 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-teal-200"
                          >
                            {notification.action}
                          </button>
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-white/20 hover:text-white"
                          >
                            Marcar leida
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-teal-300 text-slate-950">
                  <FaCheck />
                </div>
                <p className="mt-3 font-black">Todo bajo control</p>
                <p className="mt-1 text-sm text-slate-400">
                  No hay alertas importantes para este sprint.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;
