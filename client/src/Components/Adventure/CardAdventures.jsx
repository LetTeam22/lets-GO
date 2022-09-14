import React from 'react';
import s from './CardAdventures.module.css'




const CardAdventures = ({ id, handleCheck, name, description, date, conditions, image, price, difficulty }) => {

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={image} alt='img not found' />
            <div className={s.description}>
                <h2 className={s.h2}>{date} / Dificultad {difficulty}</h2>
                <h2 className={s.h1}>{name}</h2>
                <p className={s.p}>{description}</p>
                <p className={s.p2}>{conditions}</p>
                <div className={s.boxes} >
                    <p className={s.price}>Precio: ${price}</p>
                    <input
                        id={id}
                        type="checkbox"
                        name={name}
                        onClick={handleCheck}
                        className={s.input}
                    />
                    <label htmlFor={id}>Me subo a esta aventura</label>
                </div>

            </div>
        </div >
    )
};

export default CardAdventures