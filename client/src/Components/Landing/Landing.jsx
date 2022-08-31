import React, { useEffect } from "react";
import s from "./Landing.module.css";
import { Link } from "react-router-dom";
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import fondo from "../../image/img_fondo1.png";
import { Destacados } from "../Destacados/Destacados";
import { Accesories } from "../Accesories/Accesories";
import { Experiencies } from "../Experiencies/Experiencies";

export const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.container}>
        <div className={s.fondo}></div> 
      <div className={s.landing}>
        <div className={s.textDiv}>
          <p className={s.text}>
            para mantener el equilibrio, segui en movimiento
          </p>
          <Link to="/home">
            <button className={s.searchBtn}>BUSCAR BICI</button>
          </Link>
        </div>
        {/* <div className={s.flechas}>
                    <VscChevronRight color='white' size='50px' cursor='pointer' />
                    <VscChevronLeft color='white' size='50px' cursor='pointer' />
                </div> */}
      </div>
      <div className={s.separador} id={s.first}>
        <div className={s.triangle}></div>
      </div>
      <Destacados />
      <div className={s.separador} id={s.second}>
        <div className={s.triangle}></div>
      </div>
      <Accesories />
      <div className={s.separador} id={s.second}>
        <div className={s.triangle}></div>
      </div>
      <Experiencies />

      {/* <div className={s.separador} id={s.second}>
        <div className={s.triangle}></div> */}
      {/* </div> */}
    </div>
  );
};

/* <Link to={'/privateRoute'} className={s.prueba}>
                <button>Go to the private component</button>
            </Link> */
