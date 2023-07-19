import React from "react";
import s from "./ModalContact.module.css";

export const ModalTextExperience = ({ showText }) => {
  return (
    <div className={s.container}>
      <p className={s.title}>
        Mensaje original{" "}
        <span className={s.tite1}>( idioma {showText?.language} )</span> :
      </p>
      <p className={s.text}>{showText?.textExperience}</p>
      <p className={s.title}>Traducción</p>
      <p className={s.text}>{showText?.translation}</p>
    </div>
  );
};
