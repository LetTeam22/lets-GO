import React from "react";
import s from "./Button.module.css";
import { SubItems } from "../SubItems/Subitems";

export const Button = ({ children, onClick, active, childrens, table, value }) => {
  // la idea de pasarle en childrens si hay arreglo con subgrupos

  if (!childrens) {
    return (
      <button
        onClick={() => onClick(table, value)}
        className={active === value ? `${s.button} ${s.active}` : s.button}
      >
        {children}
      </button>
    );
  } else {
    return (
      <SubItems
        onClick={onClick}
        active={active}
        value={value}
        table={table}
        children={children}
        childrens={childrens}
      />
    );
  }
};
