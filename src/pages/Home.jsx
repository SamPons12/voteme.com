import { Button } from "@radix-ui/themes";

export default function Home() {
  document.title = "Vote4Me | Inicio";

  return (
    <main className="min-h-dvh bg-[url(/pawel-czerwinski-xwp0_eLoZp0-unsplash.jpg)] bg-center bg-cover">
      
      <section className="pt-40 px-10 pb-20 flex min-h-screen flex-col items-center justify-center relative">
        <svg xmlns="http://www.w3.org/2000/svg" className=" hidden w-40 h-50 absolute bottom-10 left-60 lg:block animate-pulse" viewBox="0 0 32 32" id="Romance-Love-Letter-Open--Streamline-Pixel" height="32" width="32">
          <title>romance-love-letter-open</title>
          <g>
            <path d="m30.47 15.23 -1.52 0 0 1.53 1.52 0 0 12.19 1.53 0 0 -16.76 -1.53 0 0 3.04z" fill="#000000" strokeWidth="1"></path>
            <path d="M28.95 28.95h1.52v1.52h-1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="M28.95 10.66h1.52v1.53h-1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="m27.43 28.95 -1.53 0 0 1.52 -19.81 0 0 -1.52 -1.52 0 0 1.52 -1.53 0 0 1.53 25.91 0 0 -1.53 -1.52 0 0 -1.52z" fill="#000000" strokeWidth="1"></path>
            <path d="M24.38 27.42h1.52v1.53h-1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="M22.85 25.9h1.53v1.52h-1.53Z" fill="#000000" strokeWidth="1"></path>
            <path d="M22.85 18.28h3.05v1.53h-3.05Z" fill="#000000" strokeWidth="1"></path>
            <path d="M21.33 24.38h1.52v1.52h-1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="M19.81 22.85h1.52v1.53h-1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="M19.81 19.81h3.04v1.52h-3.04Z" fill="#000000" strokeWidth="1"></path>
            <path d="M19.81 1.52h1.52v1.52h-1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="m19.81 10.66 -3.05 0 0 1.53 -1.52 0 0 -1.53 -3.05 0 0 1.53 -1.53 0 0 3.04 1.53 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.53 1.52 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.53 1.52 0 0 -3.04 -1.52 0 0 -1.53z" fill="#000000" strokeWidth="1"></path>
            <path d="M12.19 21.33h7.62v1.52h-7.62Z" fill="#000000" strokeWidth="1"></path>
            <path d="M12.19 0h7.62v1.52h-7.62Z" fill="#000000" strokeWidth="1"></path>
            <path d="M10.66 22.85h1.53v1.53h-1.53Z" fill="#000000" strokeWidth="1"></path>
            <path d="M9.14 19.81h3.05v1.52H9.14Z" fill="#000000" strokeWidth="1"></path>
            <path d="M10.66 1.52h1.53v1.52h-1.53Z" fill="#000000" strokeWidth="1"></path>
            <path d="M9.14 24.38h1.52v1.52H9.14Z" fill="#000000" strokeWidth="1"></path>
            <path d="M7.62 25.9h1.52v1.52H7.62Z" fill="#000000" strokeWidth="1"></path>
            <path d="M6.09 18.28h3.05v1.53H6.09Z" fill="#000000" strokeWidth="1"></path>
            <path d="M6.09 27.42h1.53v1.53H6.09Z" fill="#000000" strokeWidth="1"></path>
            <path d="m4.57 16.76 -1.53 0 0 1.52 3.05 0 0 -12.19 19.81 0 0 12.19 3.05 0 0 -1.52 -1.52 0 0 -6.1 1.52 0 0 -1.52 -1.52 0 0 -4.57 -4.58 0 0 -1.53 -1.52 0 0 1.53 -10.67 0 0 -1.53 -1.52 0 0 1.53 -4.57 0 0 4.57 -1.53 0 0 1.52 1.53 0 0 6.1z" fill="#000000" strokeWidth="1"></path>
            <path d="M1.52 28.95h1.52v1.52H1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="M1.52 10.66h1.52v1.53H1.52Z" fill="#000000" strokeWidth="1"></path>
            <path d="m1.52 16.76 1.52 0 0 -1.53 -1.52 0 0 -3.04 -1.52 0 0 16.76 1.52 0 0 -12.19z" fill="#000000" strokeWidth="1"></path>
          </g>
        </svg>
        <svg id="Chip--Streamline-Carbon" className="hidden w-40 h-50 absolute top-40 right-50 animate-pulse lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
          <defs></defs>
          <title>chip</title>
          <path d="M5.5 5.5v5h5V5.5Zm4 4h-3v-3h3Z" fill="#000000" strokeWidth="0.5"></path>
          <path d="M15 6.5v-1h-2V4a1 1 0 0 0 -1 -1h-1.5V1h-1v2h-3V1h-1v2H4a1 1 0 0 0 -1 1v1.5H1v1h2v3H1v1h2v1.5a1 1 0 0 0 1 1h1.5v2h1v-2h3v2h1v-2h1.5a1 1 0 0 0 1 -1v-1.5h2v-1h-2v-3Zm-3 5.5H4V4h8Z" fill="#000000" strokeWidth="0.5"></path>
          <path id="_Transparent_Rectangle_" d="M0 0h16v16H0Z" fill="none" strokeWidth="0.5"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden w-40 h-50 absolute top-60 left-100 animate-pulse lg:block" fill="none" viewBox="0 0 24 24" id="Network--Streamline-Cyber" height="24" width="24">
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M13.5 13.25 10 15.5l-3.5 -2.25v-3.5L10 7.5l3.5 2.25v3.5Z" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M4.5 6.75 2.5 8l-2 -1.25v-2l2 -1.25 2 1.25v2Z" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M19.5 4.75 17.5 6l-2 -1.25v-2l2 -1.25 2 1.25v2Z" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m4.5 21.25 -2 1.25 -2 -1.25v-2l2 -1.25 2 1.25v2Z" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m21 22.25 -2 1.25 -2 -1.25v-2L19 19l2 1.25v2Z" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m22.5 12.5 -2 1.25 -2 -1.25v-2l2 -1.25 2 1.25v2Z" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m6.49999 9.75005 -2.687 -2.57" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m17.696 19.815 -5.968 -5.426" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M18.5 11.5h-5" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m7.95201 14.184 -4.27 4.555" strokeWidth="1"></path>
          <path stroke="#092f63" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m16.318 5.26099 -3.686 3.931" strokeWidth="1"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="hidden w-40 h-50 animate-pulse absolute lg:block bottom-30 right-60" viewBox="0 0 48 48" id="Trending-Up-Sharp--Streamline-Ionic-Sharp" height="48" width="48">
          <path stroke="#000000" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="3" d="M33 13.5h10.5V24"></path>
          <path stroke="#000000" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="3" d="M4.5 34.5 18 21l9 9 15 -15"></path>
        </svg>
        <div className="relative max-w-6xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Vote4Me</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Una plataforma de votaciones clara, justa y sencilla.
          </p>

          <a
            href="/votar"
            className="inline-block bg-blue-900 uppercase  text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            🗳️ Empezar a votar
          </a>

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
