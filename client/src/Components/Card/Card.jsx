import React from 'react';
import s from './Card.module.css';


export const Card = ({ name, type, image, traction, wheelSize, price, color }) => {

    return (
        <div className={s.card}>
            <img src={image} alt='img not found' className={s.imgCard} /> 
            <div>
                <h3>{name}</h3>              
                <h4>{type} </h4>
                <h4>{traction}</h4>
                <span>{wheelSize}</span>
                <span>{price}</span>
                <span>{color}</span>
            </div>                  
        </div>
    )
};