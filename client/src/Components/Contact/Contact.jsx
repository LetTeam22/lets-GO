import React, { useEffect } from 'react';
import s from './Contact.module.css';
import aux_contacto from '../../image/aux_/aux_contacto.png';

export const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <img src={aux_contacto} alt='aux_contacto' className={s.img_aux} />
    )
};
