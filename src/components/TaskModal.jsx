import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import useTasks from "../hooks/useTasks";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  status: "backlog",
  owner: "Leo",
  dueDate: "",
};

function TaskModal({ closeModal }) {
  const { addTask } = useTasks();
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      await addTask(form);
      closeModal();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg border border-white/10 bg-[#111522] p-6 shadow-2xl shadow-black/50"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
              Nueva tarea
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Crea una tarea para el sprint
            </h2>
          </div>

          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={closeModal}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200"
          >
            <FaXmark />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Titulo
            </span>
            <input
              type="text"
              placeholder="Ej: Integrar autenticacion"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
              required
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Descripcion
            </span>
            <textarea
              placeholder="Detalle breve de lo que hay que resolver"
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              rows="4"
              className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Prioridad
            </span>
            <select
              value={form.priority}
              onChange={(event) => updateField("priority", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-teal-300/60"
            >
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Estado
            </span>
            <select
              value={form.status}
              onChange={(event) => updateField("status", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-teal-300/60"
            >
              <option value="backlog">Backlog</option>
              <option value="progress">En progreso</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Responsable
            </span>
            <input
              type="text"
              value={form.owner}
              onChange={(event) => updateField("owner", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-teal-300/60"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              Fecha limite
            </span>
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => updateField("dueDate", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-teal-300/60"
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-white/10 px-5 py-3 font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-teal-300 px-5 py-3 font-black text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Creando..." : "Crear tarea"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskModal;
