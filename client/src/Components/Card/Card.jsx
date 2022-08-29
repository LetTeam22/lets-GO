import React from 'react';
import s from './Card.module.css';


export const Card = ({ name, type, image, traction, wheelSize, price, id }) => {

    return (
        <div className={id % 2 === 0 ? `${s.card}` : `${s.cardTwo}`}>
            <img src={image} alt='img not found' className={s.imgCard} /> 
            
            <h3 className={s.name}>{name}</h3>              
            <h4 className={s.data}>{type} </h4>
            <h4 className={s.data}>tracción {traction}</h4>
            <h4 className={s.data}>{wheelSize}</h4>
            <h4 className={s.price}>${price}/día</h4>
                              
        </div>
    )
};