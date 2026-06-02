import { FaMagnifyingGlass, FaRightFromBracket } from "react-icons/fa6";
import navigationLinks from "../constants/navigation.jsx";
import useAuth from "../hooks/useAuth";
import { getInitials } from "../utils/user";
import NotificationCenter from "./NotificationCenter";

const sectionTitles = {
  dashboard: "Product Sprint",
  tasks: "Centro de tareas",
  teams: "Equipos",
  profile: "Perfil",
};

function Topbar({ activeSection, setActiveSection }) {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080a12]/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-h-12 items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
            Workspace
          </p>
          <h2 className="text-lg font-black tracking-tight sm:text-2xl">
            {sectionTitles[activeSection]}
          </h2>
        </div>

        <div className="hidden w-full max-w-md items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-400 md:flex">
          <FaMagnifyingGlass className="text-sm" />
          <span className="text-sm">Buscar tarea, owner o prioridad</span>
        </div>

        <NotificationCenter setActiveSection={setActiveSection} />

        <button
          type="button"
          aria-label="Cerrar sesion"
          onClick={logout}
          className="hidden h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-red-300/50 hover:text-red-200 sm:flex"
        >
          <FaRightFromBracket />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-300 font-black text-slate-950">
          {getInitials(currentUser?.name)}
        </div>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
        {navigationLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => setActiveSection(link.id)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
              activeSection === link.id
                ? "bg-teal-300 text-slate-950"
                : "border border-white/10 bg-white/[0.04] text-slate-300"
            }`}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Topbar;
