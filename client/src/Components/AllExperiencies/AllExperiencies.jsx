import React, { useEffect } from 'react';
import s from './AllExperiencies.module.css';
import aux_exp from '../../image/aux_/aux_exp.png';

export const AllExperiencies = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img src={aux_exp} alt='aux_exp' className={s.img_aux} />
    )
};
