import React from 'react';
import s from './Accesories.module.css';
// import accesorios from '../../image/accesorios.png';
// import family from '../../image/family.png';
import { Link } from 'react-router-dom';

export const Accesories = () => {
    
    return (
        <div className={s.accesories} >
            <div className={s.titleAndText}>
                <span className={s.title}>ACCESORIOS</span>
                <p className={s.text}>Elegi los mejores accesorios para personalizar tu bici let's GO</p>
            </div>
            <div className={s.contain}>
                <div className={s.containImgAndBtn}>
                    <Link to='/allAccessories' ><button className={s.btn}>VER TODOS</button></Link>
                    <img src="https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/accesorios_drfu05.png" alt="accesorios" className={s.image}/>
                </div>
                <img src="https://res.cloudinary.com/pflet/image/upload/v1662686105/Let/image/family_fxmtqx.jpg" alt="family" className={s.familyImage}/>
            </div>
{/* 
            <span id={s.one}>Casco</span>
            <span id={s.two}>Lentes</span>
            <span id={s.three}>Botellita</span>
            <span id={s.four}>Calzado</span> */}


        </div>
    )
};
