import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { validateConfirmPassword, validateEmail, validatePassword } from "../../helpers/authValidation";

export default function Register() {
  document.title = "Vote4Me | Register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { user, register, loading } = useAuth();

  if (user) {
    return <Navigate to='/user' replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    if (!validateEmail(email)) {
      newErrors.email = 'Email no válido';
    }

    if( !validatePassword(password)) {
      newErrors.password = 'Contraseña no válida';
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      newErrors.confirmPassword = 'Las contraseñas deben de coincidir';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await register(email, password)
      } catch (err) {
        if (err.error === "EMAIL_EXISTS") {
          newErrors.email = err.message;
          setErrors(newErrors);
        }
      }
      
    }
  }

  return (
    <main className="w-full pt-40 pb-20 min-h-dvh flex justify-center items-center">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <MoonLoader size={90} color="#C9A24D" />
        </div>
      )}
      <section className="rounded-2xl bg-white p-8 shadow-2xl lg:w-1/2 lg:px-20 lg:py-12">
        <h1 className="text-2xl font-bold text-gray-900">Regístrate 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          Crea tu cuenta para continuar
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              placeholder="tu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-soft-black focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-soft-black focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-soft-black focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span>•</span>
                Mínimo 6 caracteres
              </li>
              <li className="flex items-center gap-2">
                <span>•</span>
                Mínimo 1 letra mayúscula
              </li>
              <li className="flex items-center gap-2">
                <span>•</span>
                Mínimo 1 letra minúscula
              </li>
              <li className="flex items-center gap-2">
                <span>•</span>
                Mínimo 1 número
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-accent-gold py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 cursor-pointer hover:shadow-lg"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link to='/login' className="font-medium text-accent-gold hover:underline">
            Inicia sesión
          </Link>
        </div>
      </section>
    </main>
  );
}
