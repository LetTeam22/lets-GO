import React from "react";
import s from "./NavBar.module.css";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import { Menu } from '../Menu/Menu'
// import { GoLocation } from 'react-icons/go';

export const NavBar = () => {
  
  return (
    <nav>

      {/* <div className={s.location}>
          <GoLocation color='#c4c3c3' size='26px' />
          <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
      </div> */}

      <Link to="/"><img src={logo} alt="logo" className={s.icon} /></Link>
      <Menu />
    </nav>
  )
};
