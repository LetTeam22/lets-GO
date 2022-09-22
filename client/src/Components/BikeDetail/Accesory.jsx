import React from "react";
import s from "./BikeDetail.module.css";
import RenderAccesories from "../Cloudinary/renderAccesories";

export const Accesory = ({id, name, handleCheck, price, image, defaultChecked}) => {

  return (
    <div className={s.boxes} >
      <input 
        id={id}
        type="checkbox"
        name={name}
        onClick={handleCheck}
        defaultChecked={defaultChecked}
      />
      <label style={{color:"#484848"}} htmlFor={id}><bold>{name}</bold></label>
      <p className={s.precio}>$ {price} / día</p>
      <RenderAccesories publicId={image} />
    </div>
  )
}