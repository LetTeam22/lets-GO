import React, { useEffect } from 'react';
import s from './AllAccessories.module.css';
// import aux_axesorios from '../../image/aux_/aux_axesorios.png';

export const AllAccesories = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img src="https://res.cloudinary.com/pflet/image/upload/v1662686132/Let/image/aux_/aux_axesorios_a6qjr3.png" alt='aux_axesorios' className={s.img_aux} />
    )
};
