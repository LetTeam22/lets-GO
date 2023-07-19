import React from "react";
import s from "./Sentiment.module.css";
import { AiOutlineMail } from "react-icons/ai";

export const Sentiment = ({ params }) => {
  const { value, row } = params;

  const mail = `mailto:${row.email}`;

  return (
    <>
      {value === "Negativo" ? (
        <div className={s.contain}>
          <span className={s.span}>{value}</span>
          <a href={mail} target="_blank" rel="noreferrer">
            <div className={s.icon}>
              <AiOutlineMail />
            </div>
          </a>
        </div>
      ) : (
        <div className={s.spanN}>{value}</div>
      )}
    </>
  );
};
