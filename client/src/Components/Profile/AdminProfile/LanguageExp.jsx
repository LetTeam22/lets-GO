import React from "react";
import s from "./Sentiment.module.css";

import { MdLanguage } from "react-icons/md";

export const LanguageExp = ({ params, showTextExperience }) => {
  const { textExperience, translation, language } = params.row;

  if (language === "Español") return <span className={s.spanN}>{language}</span>;

  const handleClick = () => {
    showTextExperience({
      textExperience,
      translation,
      language,
    });
  };

  return (
    <div onClick={handleClick} className={s.contain}>
      <span className={s.span}>{language}</span>
      <div className={s.icon}>
        <MdLanguage />
      </div>
    </div>
  );
};
