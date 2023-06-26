import React from "react";
import s from "./Sentiment.module.css";
import { AiOutlineMail } from "react-icons/ai";

export const Reply = ({ params }) => {
  const { value, row } = params;
  const mail = `mailto:${row.email}`;
  console.log(params);

  return (
    <>
      {!!value ? (
        <div className={s.contain}>
          <span className={s.span}>Si</span>
          <a href={mail} target="_blank" rel="noreferrer">
            <div className={s.icon}>
              <AiOutlineMail />
            </div>
          </a>
        </div>
      ) : (
        <div className={s.spanN}>No</div>
      )}
    </>
  );
};
