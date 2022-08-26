import React from 'react';
import s from './Accesories.module.css';
import accesorios from '../../image/accesorios.png';
import family from '../../image/family.png';
import { Link } from 'react-router-dom';

const Accesories = () => {
    
    
    
    return (
        <div className={s.accesories} >
            <span className={s.title}>ACCESORIOS</span>
            <span className={s.text}>Elegi los mejores accesorios para personalizar tu bici let's GO</span>

            <img src={accesorios} alt="accesorios" className={s.image}/>

            <span id={s.one}>Casco</span>
            <span id={s.two}>Lentes</span>
            <span id={s.three}>Botellita</span>
            <span id={s.four}>Calzado</span>

            <Link to='/allAccessories' >
                <button className={s.btn}>VER PRODUCTOS</button>
            </Link>

            <img src={family} alt="family" className={s.familyImage}/>
        </div>
    )
}

export default Accesories;
