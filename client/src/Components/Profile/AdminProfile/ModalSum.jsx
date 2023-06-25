import React from "react";
import s from "./ModalContact.module.css";

export const ModalSum = ({ showSum }) => {
  return (
    <div className={s.container}>
      <p className={s.title}>Mensaje Completo:</p>
      <p className={s.text}>{showSum}</p>
    </div>
  );
};
