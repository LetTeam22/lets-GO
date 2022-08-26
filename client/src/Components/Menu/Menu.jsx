import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import s from "./Menu.module.css";
import carrito from "../../image/carrito.png";
import { useAuth0 } from "@auth0/auth0-react";
import LogIn from "../NavBar/Authentication/LogIn";
import LogOut from "../NavBar/Authentication/LogOut";
import { Link } from "react-router-dom";


export const Menu = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={s.menu}>
      <div className={s.options}>
        <Link to='/home'>
          <span>BICICLETAS</span>
        </Link>
        <hr color="#F9B621" />
      </div>
      <div className={s.options}>
        <span>AVENTURAS</span>
        <hr color="#F9B621" />
      </div>
      <div className={s.options}>
        <span>VENTAJAS</span>
        <hr color="#F9B621" />
      </div>
      <div className={s.options}>
        <span>EXPERIENCIAS</span>
        <hr color="#F9B621" />
      </div>
      <div className={s.options}>
        <span>CONTACTO</span>
        <hr color="#F9B621" />
      </div>
      <SearchBar />
      <div className={s.login}>
        {isAuthenticated ? <LogOut /> : <LogIn />}
        <button className={s.carritoBtn}>
          <img className={s.carrito} src={carrito} alt="carrito" />
        </button>
      </div>
    </div>
  );
};

