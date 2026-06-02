import { useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const initialForm = {
  name: "",
  email: "",
  role: "Full Stack Developer",
  password: "",
};

function Register({ onSwitchMode }) {
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      await register(form);
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Registro"
      title="Crea tu workspace y entra directo al sprint."
      text="TaskFlow guarda tu sesion localmente y conecta el usuario con el dashboard, el perfil y el equipo."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field icon={<FaUser />}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
            required
          />
        </Field>

        <Field icon={<FaEnvelope />}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
            required
          />
        </Field>

        <Field icon={<FaUser />}>
          <select
            value={form.role}
            onChange={(event) => updateField("role", event.target.value)}
            className="w-full bg-transparent text-white outline-none"
          >
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="UX/UI Designer">UX/UI Designer</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>
        </Field>

        <Field icon={<FaLock />}>
          <input
            type="password"
            placeholder="Password minimo 6 caracteres"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
            minLength="6"
            required
          />
        </Field>

        {error && (
          <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-4 font-black text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Creando cuenta..." : "Crear cuenta"}
          <FaArrowRight />
        </button>

        <button
          type="button"
          onClick={onSwitchMode}
          className="w-full rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200"
        >
          Ya tengo cuenta
        </button>
      </form>
    </AuthShell>
  );
}

export function AuthShell({ eyebrow, title, text, children }) {
  return (
    <main className="grid min-h-screen bg-[#080a12] text-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[linear-gradient(135deg,#10211d,#101827_52%,#25190d)] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(45,212,191,0.28),transparent_28%),radial-gradient(circle_at_20%_82%,rgba(251,191,36,0.16),transparent_24%)]" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight">
            Task<span className="text-teal-300">Flow</span>
          </h1>
          <p className="mt-12 max-w-xl text-5xl font-black leading-tight tracking-tight">
            Organiza equipos, tareas y entregas desde una sola experiencia.
          </p>
        </div>

        <div className="relative z-10 grid gap-3">
          {[
            "Registro persistente en backend",
            "Sesion local lista para dashboard",
            "Perfil conectado al usuario real",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-300 text-slate-950">
                <FaCheck />
              </span>
              <span className="font-semibold text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-xl rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function Field({ icon, children }) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-4 text-slate-400 transition focus-within:border-teal-300/60">
      <span className="text-teal-200">{icon}</span>
      {children}
    </label>
  );
}

export default Register;
