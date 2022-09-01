import React from "react";
import s from "./Destacados.module.css";
import bici1 from "../../image/bicisDestacadas/img_bici1.png";
import bici2 from "../../image/bicisDestacadas/img_bici2.png";
import bici3 from "../../image/bicisDestacadas/img_bici3.png";
import bici4 from "../../image/bicisDestacadas/img_bici4.png";

export const Destacados = () => {
  return (
    <>
      <div className={s.container}>
        <span className={s.title}>DESTACADAS</span>
        <div className={s.destacadas} id={s.one}>
          <img src={bici1} alt="bici1" />
          <h4>Fenix 7 Solar Zafiro</h4>
          <span>Blanco Titanio Azul</span>
          <span>Nro. de parte: 010-02540-27</span>
          <h4 className={s.price}>$342.999</h4>
        </div>
        <div className={s.destacadas} id={s.two}>
          <img src={bici2} alt="bici2" />
          <h4>Fenix 7 Solar Zafiro</h4>
          <span>Blanco Titanio Azul</span>
          <span>Nro. de parte: 010-02540-27</span>
          <h4 className={s.price}>$342.999</h4>
        </div>
        <div className={s.destacadas} id={s.three}>
          <img src={bici3} alt="bici3" />
          <h4>Fenix 7 Solar Zafiro</h4>
          <span>Blanco Titanio Azul</span>
          <span>Nro. de parte: 010-02540-27</span>
          <h4 className={s.price}>$342.999</h4>
        </div>
        <div className={s.destacadas} id={s.four}>
          <img src={bici4} alt="bici4" />
          <h4>Fenix 7 Solar Zafiro</h4>
          <span>Blanco Titanio Azul</span>
          <span>Nro. de parte: 010-02540-27</span>
          <h4 className={s.price}>$342.999</h4>
        </div>
      </div>
    </>
  );
};
