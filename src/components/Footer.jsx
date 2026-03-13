import { IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5"
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
             
            <IoLogoInstagram className="text-off-white text-5xl cursor-pointer transform transition-all pb-2 hover:border-b-2 border-off-white hover:-translate-y-2"/>
            <IoLogoTwitter className="text-off-white text-5xl cursor-pointer transform transition-all pb-2 hover:border-b-2 border-off-white hover:-translate-y-2"/>
            <IoLogoYoutube className="text-off-white text-5xl cursor-pointer transform transition-all pb-2 hover:border-b-2 border-off-white hover:-translate-y-2"/> 
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <small className="text-sm text-off-white">© {new Date().getFullYear()}, VoteMe</small>
      </section>
    </footer>
  )
}
