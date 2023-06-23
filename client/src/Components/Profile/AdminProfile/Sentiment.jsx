import React from "react";
import s from "./Sentiment.module.css";

export const Sentiment = ({ params }) => {
  const { value, row } = params;
  return (
    <>
      {value === "Negativa" ? 
        <a className={s.negative} href={`mailto:${row.email}`}>{value}</a>
        : 
        <div>{value}</div>
      }
    </>
  );
};
