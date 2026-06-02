import { FaCrown, FaFire, FaUsers } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useTasks from "../hooks/useTasks";
import { getInitials } from "../utils/user";

function UserPanel() {
  const { stats } = useTasks();
  const { currentUser } = useAuth();

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="flex items-center gap-4 xl:flex-col xl:text-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-teal-300 text-2xl font-black text-slate-950">
          {getInitials(currentUser?.name)}
        </div>

        <div>
          <h2 className="text-xl font-black">{currentUser?.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{currentUser?.role}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-300 px-3 py-2 text-xs font-black text-slate-950">
            <FaCrown />
            Pro Plan
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-black/20 p-4">
          <FaFire className="text-amber-300" />
          <p className="mt-3 text-2xl font-black">{stats.urgent}</p>
          <p className="text-xs text-slate-400">urgentes</p>
        </div>
        <div className="rounded-lg bg-black/20 p-4">
          <FaUsers className="text-teal-300" />
          <p className="mt-3 text-2xl font-black">4</p>
          <p className="text-xs text-slate-400">miembros</p>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
