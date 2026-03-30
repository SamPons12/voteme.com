import { Link } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";

export default function RegisteredSuccess() {

  return (
  <section className="w-full px-10 pt-40 pb-20 min-h-dvh flex justify-center items-center bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
      <div className="rounded-2xl flex flex-col gap-5 bg-white p-8 shadow-2xl lg:w-1/2 lg:px-20 lg:py-12">
        <div>
          <h1 className="text-4xl text-center font-bold text-gray-900">Registro exitoso! 🎉</h1>
        </div>

        <div className="flex justify-center items-center">
          <FaRegCheckCircle className="text-green-500 text-8xl mt-4" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="mt-4 text-gray-700">¡Gracias por registrarte! Hemos enviado un correo de <span className="font-extrabold">verificación</span> a tu dirección de email. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.</p>
          <p className="mt-2 text-gray-700">Si no recibiste el correo, revisa tu carpeta de spam o intenta registrarte nuevamente.</p>
        </div>

        <div className="flex justify-center mt-5">
          <div>
            <Link to="/login" className="w-full rounded-lg bg-blue-900 px-4 py-4 font-semibold text-white shadow-md transition hover:-translate-y-0.5 cursor-pointer hover:shadow-lg">
            Iniciar Sesión
            </Link>
          </div>    
        </div>
      </div>
    </section>
  )
}
