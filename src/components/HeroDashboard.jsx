import { motion } from "framer-motion";
import useTasks from "../hooks/useTasks";

function HeroDashboard() {
  const { stats } = useTasks();
  const progress =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative min-h-[270px] overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#13201d_0%,#101827_48%,#2a1b12_100%)] px-6 py-7 shadow-2xl shadow-black/30 sm:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(45,212,191,0.28),transparent_30%),radial-gradient(circle_at_18%_88%,rgba(251,191,36,0.14),transparent_26%)]" />
      <div className="absolute right-7 top-24 hidden h-32 w-52 rotate-6 rounded-lg border border-teal-200/20 bg-black/20 p-4 backdrop-blur sm:block">
        <div className="mb-4 h-2 w-24 rounded-full bg-teal-200/60" />
        <div className="mb-3 h-2 w-36 rounded-full bg-white/20" />
        <div className="h-2 w-28 rounded-full bg-white/10" />
      </div>

      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-100">
            Task manager full stack
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Gestiona prioridades sin perder el ritmo del equipo.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            API propia, tablero Kanban y datos persistentes para seguir el sprint
            desde una interfaz clara, rapida y lista para presentar.
          </p>
        </div>

        <div className="mt-8 max-w-md">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-200">Progreso del sprint</span>
            <span className="font-black text-teal-200">{progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-teal-300 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroDashboard;
