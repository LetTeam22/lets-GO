import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import s from "./Menu.module.css";
// import carrito from "../../image/carrito.png";
// import bell from '../../image/bell.png'
import { useAuth0 } from "@auth0/auth0-react";
import LogIn from "../NavBar/Authentication/LogIn";
import LogOut from "../NavBar/Authentication/LogOut";
import { Link } from "react-router-dom";
// import logo from "../../image/logo.png";


export const Menu = () => {
  const logo = "https://res.cloudinary.com/pflet/image/upload/v1662686136/Let/image/logo_vwis1a.png"
  const { isAuthenticated } = useAuth0();

  return (
    <div className={s.menu}>
      <Link to="/"><img src={logo} alt="logo" className={s.icon} /></Link>
      <div className={s.options}>
        <div >
          <Link to='/home'><span className={s.span}>BICICLETAS</span></Link>
        </div>
        <div >
          <Link to='/adventure'><span className={s.span}>AVENTURAS</span></Link>
        </div>
        <div >
          <Link to='/promotions'><span className={s.span}>BENEFICIOS</span></Link>
        </div>
        <div >
          <Link to='/allExperiencies'><span className={s.span}>EXPERIENCIAS</span></Link>
        </div>
        <div >
          <Link to='/contact'><span className={s.span}>CONTACTO</span></Link>
        </div>
      </div>

      <SearchBar />
      <div className={s.login}>
        {isAuthenticated ? <LogOut /> : <LogIn />}
        <Link to='/cart'>
          <button className={s.carritoBtn}>
            <img className={s.carrito} src="https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/carrito_wohy11.png" alt="carrito" />
          </button>
        </Link>
        <img src="https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/bell_kcl5ww.png" className={s.bell} alt='bell' ></img>
      </div>
    </div>
  );
};
