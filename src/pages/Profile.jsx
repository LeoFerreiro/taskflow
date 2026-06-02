import { FaGithub, FaLaptopCode, FaMedal, FaRegEnvelope } from "react-icons/fa6";
import StatCard from "../components/StatCard";
import useAuth from "../hooks/useAuth";
import useTasks from "../hooks/useTasks";
import { getInitials } from "../utils/user";

function Profile() {
  const { currentUser } = useAuth();
  const { tasks, stats } = useTasks();
  const firstName = currentUser?.name?.split(" ")[0] || "";
  const ownTasks = tasks.filter(
    (task) => task.owner === firstName || task.owner === currentUser?.name
  );
  const doneOwnTasks = ownTasks.filter((task) => task.status === "done").length;
  const completion =
    ownTasks.length > 0 ? Math.round((doneOwnTasks / ownTasks.length) * 100) : 0;

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
          <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-teal-300 text-4xl font-black text-slate-950">
            {getInitials(currentUser?.name)}
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tight">
            {currentUser?.name}
          </h1>
          <p className="mt-2 text-sm font-semibold text-teal-200">
            {currentUser?.role}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Construyendo TaskFlow con foco en producto, frontend cuidado y API
            simple para entregar una demo bien redonda.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <Contact icon={<FaRegEnvelope />} text={currentUser?.email} />
            <Contact icon={<FaGithub />} text="github.com/leonardo" />
            <Contact icon={<FaLaptopCode />} text="React, Node, UX" />
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard title="Mis tareas" value={ownTasks.length} icon={<FaLaptopCode />} />
            <StatCard title="Completadas" value={doneOwnTasks} icon={<FaMedal />} accent="green" />
            <StatCard title="Avance" value={`${completion}%`} icon={<FaMedal />} accent="amber" />
          </div>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                  Perfil
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  Preferencias de trabajo
                </h2>
              </div>
              <span className="w-fit rounded-lg bg-emerald-300 px-3 py-2 text-xs font-black text-slate-950">
                Disponible
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Preference label="Modo favorito" value="Deep work por bloques" />
              <Preference label="Stack principal" value="React + Node" />
              <Preference label="Objetivo actual" value="Demo full stack impecable" />
              <Preference label="Tareas totales del workspace" value={stats.total} />
            </div>
          </section>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
        <h2 className="text-xl font-black">Mis tareas asignadas</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {ownTasks.length > 0 ? (
            ownTasks.map((task) => (
              <article key={task.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black">{task.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {task.description}
                    </p>
                  </div>
                  <span className="rounded-lg bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-200">
                    {task.status}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-slate-400">No hay tareas asignadas a Leo.</p>
          )}
        </div>
      </section>
    </>
  );
}

function Contact({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-black/20 px-4 py-3">
      <span className="text-teal-200">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Preference({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-black text-slate-100">{value}</p>
    </div>
  );
}

export default Profile;
