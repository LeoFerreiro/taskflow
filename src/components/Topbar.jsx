import { FaBell } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-white/10 bg-[#080a12]/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
          Workspace
        </p>
        <h2 className="text-lg font-black tracking-tight sm:text-2xl">
          Product Sprint
        </h2>
      </div>

      <div className="hidden w-full max-w-md items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-400 md:flex">
        <FaMagnifyingGlass className="text-sm" />
        <span className="text-sm">Buscar tarea, owner o prioridad</span>
      </div>

      <button
        aria-label="Notificaciones"
        className="hidden h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-teal-300/50 hover:text-teal-200 sm:flex"
      >
        <FaBell />
      </button>

      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-300 font-black text-slate-950">
        LF
      </div>
    </header>
  );
}

export default Topbar;
