import React from "react";
import s from "./BikeDetail.module.css";
import RenderAccesories from "../Cloudinary/renderAccesories";

export const Accesory = ({id, name, handleCheck, price, image}) => {

  return (
    <div className={s.boxes} >
      <input
        id={id}
        type="checkbox"
        name={name}
        onClick={handleCheck}
      />
      <label htmlFor={id}>{name}</label>
      <p className={s.precio}>$ {price} / día</p>
      <RenderAccesories publicId={image} />
    </div>
  )
}