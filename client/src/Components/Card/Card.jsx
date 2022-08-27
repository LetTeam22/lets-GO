import React from 'react';


export const Card = ({ name, type, image, traction, wheelSize, price, color }) => {

    return (
        <div >
            <img src={image} alt='img not found' /> 
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