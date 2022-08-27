import React from "react";
import s from "./NavBar.module.css";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import Menu from '../Menu/Menu';


export const NavBar = () => {
  
  return (
    <nav>
      <Link to="/"><img src={logo} alt="logo" className={s.icon} /></Link>
      <Menu />
    </nav>
  )
};
