import React from 'react';
import s from './Card.module.css';

const Card = ({ name, type, image, traction, wheelSize, price }) => {

    return (
        <div >
            <img src={image} alt='img not found' /> 
            <div className={s.card}>
                <h3>{name}</h3>              
                <h4>{type} </h4>
                <h4>{traction}</h4>
                <span>{price}</span>
                <span>{wheelSize}</span>
            </div>                  
        </div>
    )
};

export default Card;