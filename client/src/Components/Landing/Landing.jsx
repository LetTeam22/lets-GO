import React, { useEffect } from "react";
import s from "./Landing.module.css";
import { Link } from "react-router-dom";
import { Destacados } from "../Destacados/Destacados";
import { Accesories } from "../Accesories/Accesories";
import { Experiencies } from "../Experiencies/Experiencies";
import { useDispatch } from "react-redux";
import { getFamousBikes } from "../../Redux/actions";

export const Landing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getFamousBikes());
  }, [dispatch])

  return (
    <div className={s.container}>
      <div className={s.fondo}></div>
      <div className={s.landing}>
        <div className={s.textDiv}>
          <p className={s.text}>
            Para mantener el equilibrio, seguí en movimiento.
          </p>
          <Link to="/home">
            <button className={s.searchBtn}>BUSCAR BICI</button>
          </Link>
        </div>

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
    </div>
  );
};

