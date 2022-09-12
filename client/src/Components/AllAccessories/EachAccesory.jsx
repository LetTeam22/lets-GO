import React from 'react';
import s from './EachAccesory.module.css'

const EachAccesory = ({ imgAcc, Description, Name, Price }) => {

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={imgAcc} alt='img not found' />
            <div className={s.description}>
                <h2 className={s.h2}>Customizá tu experiencia</h2>
                <h1 className={s.h1}>{Name}</h1>
                <p className={s.p}>{Description}</p>
                <p className={s.p}>A tan solo $ {Price} / día</p>
            </div>
        </div >
    )
};

export default EachAccesory