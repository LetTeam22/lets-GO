import React, { useState } from "react";
import s from "./Subitems.module.css";
import { Button } from "../Button/Button";

export const SubItems = ({ children, onClick, active, childrens, value }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className={s.containerBtn}>
      <Button
        onClick={() => setShow(!show)}
        active={active}
        value={value}
      >
        {children}
      </Button>

      {show &&
        childrens.map(({ value, table, childrens }) => {
          return (
            <Button
              onClick={() => onClick(table, value)}
              active={active}
              value={value}
              table={table}
              childrens={childrens}
            >
              {value}
            </Button>
          );
        })}
    </div>
  );
};
