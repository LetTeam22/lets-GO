import React from 'react';
import s from './Experiencies.module.css';
import experiencies from '../../image/experiencias1.png';

export const Experiencies = () => {

    return (
        <div className={s.experiencies}>
            <span className={s.title}>EXPERIENCIAS</span>
            <p className={s.text}>Conoce las experiencias de otras personas y comparti tu aventura con bicis let's GO</p>
            <h1 className={s.h1}>0% emisión 100% emoción</h1>
            <img src={experiencies} alt="experiencies" className={s.imgExperiencies} />
        </div>
    )
};