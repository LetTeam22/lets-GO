import React from 'react';
import s from './ExperiencesNotFound.module.css';
// import notFound from '../../image/notFound.png';

export const ExperiencesNotFound = () => {
    const notFound = "https://res.cloudinary.com/pflet/image/upload/v1662686106/Let/image/notFound_vthgrh.png"
    return (
        <img src={notFound} alt='aux_beneficios' className={s.img_notFound} />
    );

};