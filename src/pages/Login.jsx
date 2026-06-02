import { useState } from "react";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { AuthShell, Field } from "./Register";

function Login({ onSwitchMode }) {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "leo@taskflow.dev",
    password: "123456",
  });
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
      await login(form);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Login"
      title="Vuelve al sprint donde lo dejaste."
      text="Usa la cuenta demo o entra con un usuario registrado desde TaskFlow."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Field icon={<FaLock />}>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
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
          {isSaving ? "Entrando..." : "Entrar"}
          <FaArrowRight />
        </button>

        <button
          type="button"
          onClick={onSwitchMode}
          className="w-full rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-teal-300/50 hover:text-teal-200"
        >
          Crear cuenta nueva
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
