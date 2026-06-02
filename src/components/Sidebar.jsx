import {
  FaChartPie,
  FaClipboardList,
  FaLayerGroup,
  FaUser,
} from "react-icons/fa";

function Sidebar() {
  const links = [
    { label: "Dashboard", icon: <FaChartPie />, active: true },
    { label: "Tareas", icon: <FaClipboardList /> },
    { label: "Equipos", icon: <FaLayerGroup /> },
    { label: "Perfil", icon: <FaUser /> },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-white/10 bg-[#0d101c]/95 p-6 shadow-2xl shadow-black/30 lg:flex">
      <h1 className="mb-10 text-2xl font-black tracking-tight">
        Task<span className="text-teal-300">Flow</span>
      </h1>

      <nav className="space-y-2">
        {links.map((link) => (
          <button
            key={link.label}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
              link.active
                ? "bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20"
                : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
          Sprint actual
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Entrega full stack con API, tablero y experiencia visual lista para demo.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
