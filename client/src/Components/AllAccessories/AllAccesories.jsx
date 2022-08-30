import React, { useEffect } from 'react';
import s from './AllAccessories.module.css';
import aux_axesorios from '../../image/aux_/aux_axesorios.png';

export const AllAccesories = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img src={aux_axesorios} alt='aux_axesorios' className={s.img_aux} />
    )
};
