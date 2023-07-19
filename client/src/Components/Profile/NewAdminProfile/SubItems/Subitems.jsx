import React, { useState } from "react";
import s from "./Subitems.module.css";
import { Button } from "../Button/Button";
import { Box } from "../Box/Box";

export const SubItems = ({ children, onClick, active, childrens, value }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`${s.containerBtn} ${show ? s.active : ""}`}>
      <Button onClick={() => setShow(!show)} active={active} value={value}>
        {children}
        <Box show={show} onClick={() => setShow(!show)} />
      </Button>
        <section>
          {childrens.map(({ value, table, childrens },i) => {
            return (
              <Button
                key={i}
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
        </section>
    </div>
  );
};
