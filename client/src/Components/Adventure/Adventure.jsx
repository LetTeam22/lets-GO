import React from 'react'
import s from './Adventure.module.css';
import aux_aventuras from '../../image/aux_/aux_aventuras.png';

export const Adventure = () => {
    
    
    return (
        <img src={aux_aventuras} alt='aux_aventuras' className={s.img_aux} />
    )
};