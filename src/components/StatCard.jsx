import { motion } from "framer-motion";

const accents = {
  teal: "bg-teal-300 text-slate-950 shadow-teal-500/20",
  blue: "bg-sky-300 text-slate-950 shadow-sky-500/20",
  green: "bg-emerald-300 text-slate-950 shadow-emerald-500/20",
  amber: "bg-amber-300 text-slate-950 shadow-amber-500/20",
};

function StatCard({ title, value, icon, accent = "teal" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-400">{title}</p>
          <h3 className="mt-2 text-4xl font-black leading-none">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg shadow-lg ${
            accents[accent]
          }`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
