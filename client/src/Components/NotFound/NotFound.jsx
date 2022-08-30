import React from 'react';
import s from './NotFound.module.css';
import notFound from '../../image/notFound.png';

export const NotFound = () => {

    return (
        <img src={notFound} alt='aux_beneficios' className={s.img_notFound} />
    );

};