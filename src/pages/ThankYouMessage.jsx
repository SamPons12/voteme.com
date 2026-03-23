import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";

export default function ThankYouMessage() {
  document.title = "Vote4Me | Gracias por participar";

  return (
    <main className="min-h-dvh bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover bg-gray-900">
      <section className="min-h-dvh flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 max-w-lg w-full text-center space-y-6">
          <div className="flex justify-center">
            <FaCheckCircle className="text-green-500 w-20 h-20" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            ¡Gracias por participar!
          </h1>

          <p className="text-gray-600 text-lg">
            Tu voto ha sido registrado correctamente. Agradecemos tu participación en esta edición de votaciones.
          </p>

          <div className="border-t border-gray-200 pt-6 space-y-3">
            <p className="text-sm text-gray-500">
              Los resultados se publicarán una vez finalice el periodo de votación.
            </p>

            <Link to="/">
              <Button className="bg-blue-900 text-white px-8 py-6 text-lg cursor-pointer mt-4">
                🏠 Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
