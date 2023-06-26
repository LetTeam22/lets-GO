import React from "react";
import { FaRegEye } from "react-icons/fa";
import s from "./Sentiment.module.css";


export const Summary = ({ params, showFcn, showSummary, fromContact }) => {
  const { value, id } = params;
  const handleClick = () => {
    const message =
      fromContact && params.row.language === "Español"
        ? params.row.message
        : params.row.translation;
    const parameter = fromContact ? message : id;
    fromContact ? showSummary(parameter) : showFcn(parameter);
  };
  return (
    <>
      <div className={s.contain}>
        <span className={s.spanN}>{value}</span>
        <span onClick={handleClick}>
          <div className={s.icon}>
            <FaRegEye />
          </div>
        </span>
      </div>
    </>
  );
};
