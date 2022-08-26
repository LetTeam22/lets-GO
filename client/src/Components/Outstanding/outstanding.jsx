import React from 'react';
import s from './outstanding.module.css';
import img1 from '../../image/outstanding.png'
import img2 from '../../image/separador1.png'

export const  OutstandingBikes = () => {
    return (
        <>
            <div>
                <img className={s.out} src={img1} alt="img" />
                <img className={s.separator}src={img2} alt="img" />
            </div>

        </>
    )
};