import React from "react";
import { FaRegEye } from "react-icons/fa";
import s from "./Summary.module.css";

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
      <div className={s.container}>
        <span className={s.toDefault}>{value}</span>
        <span onClick={handleClick}>
          <FaRegEye />
        </span>
      </div>
    </>
  );
};
