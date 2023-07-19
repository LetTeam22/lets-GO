import React from "react";
import s from "./ModalContact.module.css";

export const ModalContact = ({ show }) => {
  return (
    <div className={s.container}>
      <p className={s.title}>
        Mensaje original{" "}
        <span className={s.tite1}>( idioma {show?.language} )</span> :
      </p>
      <p className={s.text}>{show?.message}</p>
      <p className={s.title}>Traducción</p>
      <p className={s.text}>{show?.translation}</p>
    </div>
  );
};
