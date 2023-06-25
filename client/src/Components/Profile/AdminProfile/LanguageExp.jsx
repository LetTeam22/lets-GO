import React from "react";
import s from "./LanguageExp.module.css";
import { MdLanguage } from "react-icons/md";

export const LanguageExp = ({ params, showTextExperience }) => {
  const { textExperience, translation, language } = params.row;

  if (language === "Español") return <span>{language}</span>;

  const handleClick = () => {
    showTextExperience({
      textExperience,
      translation,
      language,
    });
  };

  return (
    <div onClick={handleClick} className={`${s.container} ${s.toClick}`}>
      <span className={s.language}>{language}</span>
      <MdLanguage />
    </div>
  );
};
