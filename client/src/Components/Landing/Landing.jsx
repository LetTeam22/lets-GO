import React, { useEffect, useMemo } from "react";
import s from "./Landing.module.css";
import { Link } from "react-router-dom";
import { Destacados } from "../Destacados/Destacados";
import { Accesories } from "../Accesories/Accesories";
import { Experiencies } from "../Experiencies/Experiencies";
import { useDispatch } from "react-redux";
import { getFamousBikes } from "../../Redux/actions";
import { QuienesSomos } from "./QuienesSomos/QuienesSomos";
import Chatbot from "../ChatBot/ChatBot";

export const Landing = ({socket}) => {

  const dispatch = useDispatch();

  const bookings = useMemo(() => {
    return JSON.parse(localStorage.getItem("booking")) || [];
  }, []);

  const Adventures = useMemo(() => {
    return JSON.parse(localStorage.getItem("adventure")) || [];
  }, [])

  useEffect(() => {
    if(Array.isArray(bookings) && Array.isArray(Adventures) && (bookings.length || Adventures.length)) {
      socket?.emit('shoppingCart')
    }
  }, [socket, bookings, Adventures])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getFamousBikes());
  }, [dispatch])

  return (
    <div className={s.container}>
      <Chatbot/>
      <div className={s.fondo}></div>
      <div className={s.landing}>
        <div className={s.textDiv}>
          <p className={s.text}>
            para mantener el equilibrio, seguí en movimiento
          </p>
          <Link to="/home">
            <button className={s.searchBtn}>BUSCAR BICI</button>
          </Link>
        </div>
      </div>
      <div className={s.separador} id={s.first}>
        <div className={s.triangle}></div>
      </div>
      <QuienesSomos />
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

