import React from 'react';
import s from './Accesories.module.css';
import { Link } from 'react-router-dom';

export const Accesories = () => {
    
    const acc = 'https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/accesorios_drfu05.png'
    const family = 'https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/family_fxmtqx.jpg'

    return (
        <div className={s.accesories} >
            <div className={s.titleAndText}>
                <span className={s.title}>ACCESORIOS</span>
                <p className={s.text}>Elegí los mejores accesorios para personalizar tu bici let's GO</p>
            </div>
            <div className={s.contain}>
                <div className={s.containImgAndBtn}>
                    <Link to='/allAccessories' ><button className={s.btn}>VER TODOS</button></Link>
                    <img src={acc} alt="accesorios" className={s.image}/>
                </div>
                <img src={family} alt="family" className={s.familyImage}/>
            </div>
        </div>
    )
};
