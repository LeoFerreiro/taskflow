import { FaCode, FaDatabase, FaPalette, FaShieldHalved } from "react-icons/fa6";
import useTasks from "../hooks/useTasks";

const members = [
  {
    name: "Leonardo",
    handle: "LF",
    role: "Full Stack Developer",
    specialty: "Frontend + integracion",
    icon: <FaCode />,
    accent: "bg-teal-300 text-slate-950",
  },
  {
    name: "Nadia",
    handle: "NS",
    role: "Backend Developer",
    specialty: "API, datos y servicios",
    icon: <FaDatabase />,
    accent: "bg-sky-300 text-slate-950",
  },
  {
    name: "Mica",
    handle: "MR",
    role: "UX/UI Designer",
    specialty: "Sistema visual y experiencia",
    icon: <FaPalette />,
    accent: "bg-amber-300 text-slate-950",
  },
  {
    name: "Santi",
    handle: "SG",
    role: "QA Engineer",
    specialty: "Validacion y regresiones",
    icon: <FaShieldHalved />,
    accent: "bg-emerald-300 text-slate-950",
  },
];

function Teams() {
  const { tasks } = useTasks();
  const totalTasks = Math.max(tasks.length, 1);

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,#101827,#15111f_58%,#20170d)] p-6 shadow-2xl shadow-black/25">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
            Equipos
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight tracking-tight">
            Carga clara, roles visibles y foco compartido.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Esta vista muestra el reparto de tareas por responsable y ayuda a
            detectar rapidamente donde conviene sumar apoyo.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
          <p className="text-sm font-bold text-slate-300">Salud del equipo</p>
          <div className="mt-5 space-y-4">
            <Metric label="Foco del sprint" value="82%" tone="bg-teal-300" />
            <Metric label="Riesgo operativo" value="18%" tone="bg-amber-300" />
            <Metric label="Bloqueos abiertos" value="0" tone="bg-emerald-300" />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {members.map((member) => {
          const memberTasks = tasks.filter((task) => task.owner === member.name || task.owner === member.handle || task.owner === member.name.split(" ")[0]);
          const workload = Math.round((memberTasks.length / totalTasks) * 100);

          return (
            <article
              key={member.name}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 transition hover:border-teal-300/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-lg text-xl font-black ${member.accent}`}>
                  {member.handle}
                </div>
                <div className="rounded-lg border border-white/10 p-3 text-slate-300">
                  {member.icon}
                </div>
              </div>

              <h2 className="mt-5 text-xl font-black">{member.name}</h2>
              <p className="mt-1 text-sm font-semibold text-teal-200">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {member.specialty}
              </p>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
                  <span>Carga</span>
                  <span>{workload}%</span>
                </div>
                <div className="h-2 rounded-full bg-black/30">
                  <div
                    className="h-full rounded-full bg-teal-300"
                    style={{ width: `${workload}%` }}
                  />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300">
                {memberTasks.length} tareas asignadas
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
        <h2 className="text-xl font-black">Actividad del equipo</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Activity title="Planning" text="Backlog priorizado para la proxima entrega." />
          <Activity title="Review" text="Validacion de tareas listas antes del cierre." />
          <Activity title="Delivery" text="Build y demo preparados para compartir avances." />
        </div>
      </section>
    </>
  );
}

function Metric({ label, value, tone }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-black">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-black/30">
        <div className={`h-full rounded-full ${tone}`} style={{ width: value }} />
      </div>
    </div>
  );
}

function Activity({ title, text }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="font-black text-teal-200">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

export default Teams;
