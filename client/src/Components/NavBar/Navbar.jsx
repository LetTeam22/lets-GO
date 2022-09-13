import React from "react";
import s from "./NavBar.module.css";
import { Menu } from '../Menu/Menu';
import { GoLocation } from 'react-icons/go';


export const NavBar = ({socket}) => {

  return (
    <nav>
      <div className={s.location}>
        <GoLocation className={s.goLocation} />
        <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
      </div>
      <Menu socket={socket} />
    </nav>
  )
};
