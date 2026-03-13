import { Switch } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function Header() {
  function handleClickMenu() {
    const mobileNav = document.getElementById("mobile-nav");
    const menuIcon = document.getElementById("menu-icon");
    menuIcon.classList.toggle("is-active");
    mobileNav.classList.toggle("hidden");
    mobileNav.classList.toggle('animate__fadeInLeft')
  }

  return (
    <header className="flex animate__animated animate__fadeIn justify-between px-2 bg-soft-gray mx-5 my-5 py-2 rounded-4xl shadow-2xl fixed w-[calc(100vw-48px)] z-10
                        transform transition-all lg:w-screen lg:rounded-none lg:m-0 lg:px-10 lg:py-5">
      <div className="flex justify-center items-center lg:gap-10">
        <div>
          <NavLink to="/">
            <img src="/icon.png" className="w-15 cursor-pointer" alt="logo" />
          </NavLink>
        </div>
        <div id="mobile-nav" className="hidden animate__animated animate__faster fixed bg-soft-gray w-screen h-screen bottom-0 right-0 flex flex-col pl-5">
          <div className="flex flex-col mt-30 text-off-white text-4xl gap-5 font-extrabold">
            <NavLink to="/">INICIO</NavLink>
            <NavLink to="/ganadores">GANADORES</NavLink>
            <NavLink to="/categorias">CATEGORIAS</NavLink>
            <NavLink to="/sobre-nosotros">SOBRE NOSOTROS</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </div>
        </div>
        <div className="hidden lg:flex">
           <div className="flex text-xl text-off-white gap-8 font-extrabold">
            <NavLink className='animate__animated animate__fadeIn' to="/">INICIO</NavLink>
            <NavLink className='animate__animated animate__fadeIn animate__delay-10ms' to="/ganadores">GANADORES</NavLink>
            <NavLink className='animate__animated animate__fadeIn animate__delay-20ms' to="/categorias">CATEGORIAS</NavLink>
            <NavLink className='animate__animated animate__fadeIn animate__delay-30ms' to="/sobre-nosotros">SOBRE NOSOTROS</NavLink>
            <NavLink className='animate__animated animate__fadeIn animate__delay-40ms' to="/faq">FAQ</NavLink>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center lg:gap-10">
        <div className="gap-5 justify-center items-center hidden lg:flex"> 
          <IoSunnyOutline className="text-off-white text-3xl" />
          <Switch size='3' color="gold"/>
          <IoMoonOutline className="text-off-white text-3xl"/>
        </div>
        
        <NavLink to="/user">
          <CiUser className="text-off-white text-5xl" />
        </NavLink>
        <button
          id="menu-icon"
          className="lg:hidden! hamburger hamburger--emphatic"
          type="button"
          onClick={handleClickMenu}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </header>
  );
}
