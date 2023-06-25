import React from "react";
import s from "./LanguageContact.module.css";
import { MdLanguage } from "react-icons/md";

export const LanguageContact = ({ params, showFcn }) => {
  const { language, message, translation } = params.row;
  if (language === "Español") return <span>{language}</span>;
  const handleClick = () => {
    showFcn({
      language,
      message,
      translation,
    });
  };
  return (
    <div onClick={handleClick} className={`${s.container} ${s.toClick}`}>
      <span className={s.language}>{language}</span>
      <MdLanguage />
    </div>
  );
};
