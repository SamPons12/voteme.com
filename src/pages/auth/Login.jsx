import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export default function Login() {
  document.title = "Vote4Me | Login";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  
  const { user, login, loading } = useAuth();

  const navigate = useNavigate();

  if (user) {
    return <Navigate to='/user' replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      navigate('/user')
    } catch (err) {
      console.log(err)
      if (err.error === "INVALID_CREDENTIALS"){
        setError({email: err.message})
      }
    }
  
  }

  return (
    <main className="w-full pt-12 min-h-dvh flex justify-center items-center bg-[url(pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover">
     {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <MoonLoader size={90} color="#000080" />
        </div>
      )}
      <section className="items-center rounded-2xl bg-white p-8 shadow-2xl lg:w-1/2 lg:px-20 lg:py-12"> 
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido 👋</h1>
        <p className="mt-1 text-sm text-soft-gray">
          Inicia sesión para continuar
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-soft-black focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              required
            />
            {error.email && <small className="mt-1 text-xs text-red-600">{error.email}</small>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-soft-black focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              required
            />            
          </div>
          
          <button
            type="submit"
            className="w-full rounded-xl cursor-pointer bg-blue-900 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link to='/register' className="font-medium text-accent-gold hover:underline">
            Regístrate
          </Link>
        </div>
      </section>
    </main>
  );
}
