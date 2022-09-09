import React, { useEffect } from 'react'
import s from './Adventure.module.css';
// import aux_aventuras from '../../image/aux_/aux_aventuras.png';

export const Adventure = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <img src="https://res.cloudinary.com/pflet/image/upload/v1662686120/Let/image/aux_/aux_aventuras_ir3wap.png" alt='aux_aventuras' className={s.img_aux} />
    )
};