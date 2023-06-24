import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import s from "./Language.module.css";
import { useSelector } from "react-redux";

export const Language = ({ params }) => {
  const { value } = params;
  const experience = useSelector((state) =>
    state.allExperiences.find((ex) => {
      return ex.idExperience === params.id;
    })
  );

  const [show, setShow] = useState(null);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <>
      {value !== "Español" ? (
        <div className={s.container}>
          <span className={s.language}>{value}</span>
          <span onClick={handleClick}>
            <FaRegEye />
          </span>

          <div className={!!show ? s.modalWindow : s.hide}>
            <span className={s.background} onClick={() => setShow(null)}></span>
            {/* <ModalExperience experienceId={show} /> */}
            <div className={s.textExperience}>
              <p>Texto Original: {experience.textExperience}</p>
              <p>Traducción: {experience.translation}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>{value}</div>
      )}
    </>
  );
};
