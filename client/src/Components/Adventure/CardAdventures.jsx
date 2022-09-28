import React from "react";
import s from "./CardAdventures.module.css";

const CardAdventures = ({
  id,
  handleCheck,
  name,
  description,
  date,
  conditions,
  image,
  price,
  difficulty,
}) => {
  return (
    <div className={s.blogCard}>
      <h2 className={s.h2}>
        {date} / Dificultad {difficulty}
      </h2>
      <h2 className={s.h1}>{name}</h2>
      <section className={s.container}>
        <div>
          <img className={s.imgcard} src={image} alt="img not found" />
        </div>
        <div className={s.description}>
          <div className={s.descriptionDiv}>
            <p className={s.p}>{description}</p>
          </div>
          <div className={s.descriptionDiv}>
            <p className={s.p2}>{conditions}</p>
          </div>
          <div className={s.boxes}>
            <p className={s.price}>Precio: ${price}</p>
            <input
              id={id}
              type="checkbox"
              name={name}
              onClick={handleCheck}
              className={s.input}
            />
            <label className={s.label} htmlFor={id}>
              Me subo a esta aventura
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardAdventures;
