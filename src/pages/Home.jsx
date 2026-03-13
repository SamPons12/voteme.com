import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CiMicrochip } from "react-icons/ci";
import { GiMeshNetwork } from "react-icons/gi";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function Home() {
  document.title = "Vote4Me | Inicio";

  return (
    <main className="min-h-dvh bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover">
      
      <section className="pt-40 px-10 pb-20 flex min-h-screen flex-col items-center justify-center relative">
        <LiaVoteYeaSolid className=" hidden w-40 h-50 absolute bottom-10 left-60 lg:block animate-pulse" />
        <CiMicrochip className="hidden w-60 h-50 absolute top-40 right-50 animate-pulse lg:block" />
        <GiMeshNetwork className="hidden w-40 h-50 absolute top-60 left-100 animate-pulse lg:block" />
        <FaArrowTrendUp className="hidden w-40 h-50 animate-pulse absolute lg:block bottom-30 right-60" />
        <div className="relative max-w-6xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Vote4Me</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Una plataforma de votaciones clara, justa y sencilla.
          </p>

          <Link to='/votar'>
            <Button className=" bg-blue-900 uppercase text-white px-8 py-7 text-xl cursor-pointer">
              🗳️ Empezar a votar
            </Button>
          </Link>
          
          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-off-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate__animated animate__bounceIn">
              <h5 className="text-xl font-bold mb-2 text-soft-gray">
                🗳️ Vota fácil
              </h5>
              <p className="text-gray-600 text-sm">
                Elige tus opciones en segundos, sin complicaciones.
              </p>
            </div>
            <div className="bg-off-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate__animated animate__bounceIn animate__delay-20ms">
              <h5 className="text-xl font-bold mb-2 text-soft-gray">
                🔒 Sistema justo
              </h5>
              <p className="text-gray-600 text-sm">
                Un voto por persona. Sin trampas ni duplicados.
              </p>
            </div>
            <div className="bg-off-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate__animated animate__bounceIn animate__delay-40ms">
              <h5 className="text-xl font-bold mb-2 text-soft-gray">
                ⚡ Resultados claros
              </h5>
              <p className="text-gray-600 text-sm">
                Transparencia total una vez finaliza la votación.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
