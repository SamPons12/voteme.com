import { Switch } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

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
            <img src="icon.png" className="w-15 cursor-pointer" alt="logo" />
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f9fafb" strokeLinecap="round" strokeLinejoin="round" id="Sun--Streamline-Lucide" height="24" width="24">
            <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0 -8 0" strokeWidth="2"></path>
            <path d="M12 2v2" strokeWidth="2"></path>
            <path d="M12 20v2" strokeWidth="2"></path>
            <path d="m4.93 4.93 1.41 1.41" strokeWidth="2"></path>
            <path d="m17.66 17.66 1.41 1.41" strokeWidth="2"></path>
            <path d="M2 12h2" strokeWidth="2"></path>
            <path d="M20 12h2" strokeWidth="2"></path>
            <path d="m6.34 17.66 -1.41 1.41" strokeWidth="2"></path>
            <path d="m19.07 4.93 -1.41 1.41" strokeWidth="2"></path>
          </svg>
          <Switch size='3' color="gold"/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f9fafb" strokeLinecap="round" strokeLinejoin="round" id="Moon--Streamline-Lucide" height="24" width="24">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1 -9 -9Z" strokeWidth="2"></path>
          </svg>
        </div>
        
        <NavLink to="/user">
         <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="-0.5 -0.5 16 16" strokeLinecap="round" strokeLinejoin="round" stroke="#ffffff" id="User--Streamline-Mynaui" height="16" width="16">
          <path d="M5.625 4.6875a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 1 0 -3.75 0" strokeWidth="1"></path>
          <path d="M12.1875 12.8125c-0.296875 -5.833125 -9.078125 -5.833125 -9.375 0" strokeWidth="1"></path>
        </svg>
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
