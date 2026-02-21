import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-soft-black flex flex-col py-5 px-20 gap-15">
      <section className="flex flex-col items-center gap-18 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center justify-center">
          <div>
          <img src="icon.png" alt="" className="w-50" />
        </div>
        <div className="flex gap-5 text-md font-bold text-off-white">
          <Link to='/sobre-nosotros'>Sobre nosotros</Link>
          <Link to='/politica-privacidad'>Privacidad</Link>
          <Link to='/terminos-condiciones'>Terminos</Link>
          <Link to='/politica-cookies'>Cookies</Link>
        </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-xl font-bold text-off-white">Redes sociales</h1>
          <div className="flex gap-10">
             
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 cursor-pointer transform transition-all hover:border-b-2 border-off-white hover:-translate-y-2" fill="none" viewBox="-0.5 -0.5 16 16" strokeLinecap="round" strokeLinejoin="round" stroke="#f9fafb" id="Brand-Instagram--Streamline-Mynaui" height="50" width="100">
              <desc>
                Brand Instagram Streamline Icon: https://streamlinehq.com
              </desc>
              <path d="M9.66375 7.179375a2.1875 2.1875 0 1 1 -4.328125 0.64125 2.1875 2.1875 0 0 1 4.328125 -0.64125M10.625 4.0625h0.3125" strokeWidth="1"></path>
              <path d="M1.875 5.875c0 -1.4000000000000001 0 -2.1 0.2725 -2.6350000000000002a2.5 2.5 0 0 1 1.0925 -1.0925C3.775 1.875 4.475 1.875 5.875 1.875h3.25c1.4000000000000001 0 2.1 0 2.6350000000000002 0.2725a2.5 2.5 0 0 1 1.0925 1.0925C13.125 3.775 13.125 4.475 13.125 5.875v3.25c0 1.4000000000000001 0 2.1 -0.2725 2.6350000000000002a2.5 2.5 0 0 1 -1.0925 1.0925C11.225000000000001 13.125 10.525 13.125 9.125 13.125H5.875c-1.4000000000000001 0 -2.1 0 -2.6350000000000002 -0.2725a2.5 2.5 0 0 1 -1.0925 -1.0925C1.875 11.225000000000001 1.875 10.525 1.875 9.125z" strokeWidth="1"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 cursor-pointer transform transition-all hover:border-b-2 border-off-white hover:-translate-y-2" fill="none" viewBox="-0.5 -0.5 16 16" strokeLinecap="round" strokeLinejoin="round" stroke="#f9fafb" id="Brand-X--Streamline-Mynaui" height="50" width="100">
              <desc>
                Brand X Streamline Icon: https://streamlinehq.com
              </desc>
              <path d="m11.875 2.5 -3.70625 4.33125M3.125 12.5l3.70625 -4.33125m0 0 3.621875 4.116875c0.11875 0.135 0.301875 0.214375 0.49625 0.214375h0.92125c0.5225 0 0.816875 -0.53125 0.49562500000000004 -0.8968750000000001L8.16875 6.83125m-1.3375000000000001 1.3375000000000001L2.63375 3.3968749999999996C2.3125 3.03125 2.60625 2.5 3.1293749999999996 2.5h0.92125c0.19375 0 0.3775 0.079375 0.49625 0.214375l3.621875 4.116875" strokeWidth="1"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 cursor-pointer transform transition-all hover:border-b-2 border-off-white hover:-translate-y-2" fill="none" viewBox="-0.5 -0.5 16 16" strokeLinecap="round" strokeLinejoin="round" stroke="#f9fafb" id="Brand-Youtube--Streamline-Mynaui" height="50" width="100">
              <desc>
                Brand Youtube Streamline Icon: https://streamlinehq.com
              </desc>
              <path d="M6.5625 6.1925v2.615a0.25625 0.25625 0 0 0 0.2575 0.255 0.2625 0.2625 0 0 0 0.14250000000000002 -0.0425l1.984375 -1.29625a0.25312500000000004 0.25312500000000004 0 0 0 0.001875 -0.42375l-1.984375 -1.3187499999999999a0.25937499999999997 0.25937499999999997 0 0 0 -0.35812499999999997 0.06875 0.2525 0.2525 0 0 0 -0.043750000000000004 0.14250000000000002" strokeWidth="1"></path>
              <path d="M1.25 7.5c0 -2.0625 0 -3.09375 0.915 -3.734375C3.08125 3.125 4.55375 3.125 7.5 3.125c2.94625 0 4.419375 0 5.334375 0.640625C13.75 4.40625 13.75 5.4375 13.75 7.5s0 3.09375 -0.915625 3.734375C11.92 11.875 10.44625 11.875 7.5 11.875s-4.419375 0 -5.335 -0.640625C1.25 10.59375 1.25 9.5625 1.25 7.5" strokeWidth="1"></path>
            </svg>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <small className="text-sm text-off-white">© {new Date().getFullYear()}, VoteMe</small>
      </section>
    </footer>
  )
}
