import React from 'react';
import s from './CardAdventures.module.css'




const CardAdventures = ({ name, description, date, conditions, image, price, difficulty }) => {
    console.log(name, date)

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={image} alt='img not found' /> 
            <div className={s.description}>
                <h2 className={s.h2}>{date} / Dificultad {difficulty}</h2>
                <h2 className={s.h1}>{name}</h2>
                <p className={s.p}>{description}</p>
                <p className={s.p2}>{conditions}</p>
                <p className={s.p}>Precio: ${price}</p>
            {/* <button className={s.btn2}><img style={{width:"50%"}} src="https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/carrito_wohy11.png" alt="img not found"/></button> */}
            </div>
        </div >
    )
};

export default CardAdventures