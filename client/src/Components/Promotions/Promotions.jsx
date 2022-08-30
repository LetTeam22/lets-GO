import React, { useEffect } from 'react';
import s from './Promotions.module.css';
import aux_beneficios from '../../image/aux_/aux_beneficios.png';

export const Promotions = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img src={aux_beneficios} alt='aux_beneficios' className={s.img_aux} />
    )
};