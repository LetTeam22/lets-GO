import React from "react";
import s from './ShoppingCart.module.css';
import aux_carrito from '../../image/aux_/aux_carrito.png';

export const ShoppingCart = () => {
    return (
        <img src={aux_carrito} alt='aux_carrito' className={s.img_aux} />
    )
};