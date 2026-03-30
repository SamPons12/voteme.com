import { Link, useSearchParams } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/api/auth.service";
import { MoonLoader } from "react-spinners";
import { set } from "date-fns";

export default function VerifiyEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <main className="w-full px-10 pt-40 pb-20 min-h-dvh flex justify-center items-center bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
        <section className="rounded-2xl flex flex-col gap-5 bg-white p-8 shadow-2xl lg:w-1/2 lg:px-20 lg:py-12">
          <div>
            <h1 className="text-4xl text-center font-bold text-gray-900">
              Error
            </h1>
          </div>
          <div className="flex justify-center">
            <VscError className="text-red-500 text-8xl mt-4" />
          </div>
          <div className="flex justify-center items-center">
            <p className="text-gray-700">
              El enlace de verificación es inválido o ha expirado.
            </p>
          </div>
        </section>
      </main>
    );
  }

  useEffect(() => {
    async function verifyEmailToken() {
      setLoading(true);
      try {
        const response = await verifyEmail(token);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    verifyEmailToken();
  }, []);

  if (loading) {
    return (
      <main className="w-screen min-h-dvh flex justify-center items-center bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
        <MoonLoader size={90} color="#000080" />
      </main>
    );
  }

  
    if (error) {
      return (
        <main className="w-full px-10 pt-40 pb-20 min-h-dvh flex justify-center items-center bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
          <section className="rounded-2xl flex flex-col gap-5 bg-white p-8 shadow-2xl lg:w-1/2 lg:px-20 lg:py-12">
            <div>
              <h1 className="text-4xl text-center font-bold text-gray-900">
                Error
              </h1>
            </div>
            <div className="flex justify-center">
              <VscError className="text-red-500 text-8xl mt-4" />
            </div>
            <div className="flex justify-center items-center">
              <p className="text-gray-700">
                El enlace de verificación es inválido o ha expirado.
              </p>
            </div>
          </section>
        </main>
      );
    }
  

  return (
    <main className="w-full px-10 pt-40 pb-20 min-h-dvh flex justify-center items-center bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
      <section className="rounded-2xl flex flex-col gap-5 bg-white p-8 shadow-2xl lg:w-1/2 lg:px-20 lg:py-12">
        <div>
          <h1 className="text-4xl text-center font-bold text-gray-900">Verificado! 🎉</h1>
        </div>

        <div className="flex justify-center items-center">
          <FaRegCheckCircle className="text-green-500 text-8xl mt-4" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="mt-4 text-gray-700">¡Tu correo ha sido verificado exitosamente!</p>
          <p className="mt-2 text-gray-700">Ahora puedes iniciar sesión y comenzar a utilizar tu cuenta.</p>
        </div>

        <div className="flex justify-center mt-5">
          <div>
            <Link to="/login" className="w-full rounded-lg bg-blue-900 px-4 py-4 font-semibold text-white shadow-md transition hover:-translate-y-0.5 cursor-pointer hover:shadow-lg">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
