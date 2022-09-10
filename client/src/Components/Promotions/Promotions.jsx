import React, { useEffect } from 'react';
import s from './Promotions.module.css';
// import aux_beneficios from '../../image/aux_/aux_beneficios.png';

export const Promotions = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img src="https://res.cloudinary.com/pflet/image/upload/v1662686112/Let/image/aux_/aux_beneficios_u40uoh.png" alt='aux_beneficios' className={s.img_aux} />
    )
};