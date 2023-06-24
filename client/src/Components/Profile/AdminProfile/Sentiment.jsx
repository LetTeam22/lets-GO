import React from "react";
import s from "./Sentiment.module.css";
import { AiOutlineMail } from "react-icons/ai";

export const Sentiment = ({ params }) => {
  const { value, row } = params;
  
  const mail = `mailto:${row.email}`;

  return (
    <>
      {value === "Negativo" ? (
        <div className={s.containNeg}>
          <span className={s.negative}>{value}</span>
          <a
            href={mail}
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineMail />
          </a>
        </div>
      ) : (
        <div>{value}</div>
      )}
    </>
  );
};
