import React from 'react';
import s from './CardExperiences.module.css'





const CardExperience = ({ imgExperience, textExperience, firstName}) => {

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={imgExperience} alt='img not found' /> 
            <div className={s.description}>
                <h2 className={s.h2}>Los leters andan diciendo...</h2>
                <h1 className={s.h1}>{firstName}</h1>
                <p className={s.p}>{textExperience}</p>
            </div>
        </div >
    )
};

export default CardExperience