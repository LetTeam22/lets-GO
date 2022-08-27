import React from 'react';
import s from './Landing.module.css';
import { GoLocation } from 'react-icons/go';
// import { Link } from 'react-router-dom';
import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';
import fondo from '../../image/img_fondo1.png';
import Destacados from '../Destacados/Destacados';
import Accesories from '../Accesories/Accesories';
import Experiencies from '../Experiencies/Experiencies';


export const Landing = () => {

    return (
        
        <div className={s.container} >
            <div className={s.landing}>  

                <div className={s.location}>
                    <GoLocation color='#c4c3c3' size='26px' />
                    <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
                </div>
                
                <img src={fondo} alt='fondo' className={s.fondo} />
                <div className={s.textDiv}>
                    <p className={s.text}>para mantener el equilibrio, segui en movimiento</p>
                    <button className={s.searchBtn}>BUSCAR BICI</button>
                </div>

                <div className={s.flechas}>
                    <VscChevronRight color='white' size='50px' cursor='pointer' />
                    <VscChevronLeft color='white' size='50px' cursor='pointer' />
                </div>

            </div>
            {/* <Link to={'/privateRoute'} className={s.prueba}>
                <button>Go to the private component</button>
            </Link> */}
            
            <div className={s.separador} id={s.first}><div className={s.triangle}></div></div>
            <Destacados />

            <div className={s.separador} id={s.second}><div className={s.triangle}></div></div>
            <Accesories />

            <div className={s.separador} id={s.second}><div className={s.triangle}></div></div>
            <Experiencies />

        </div>

    )
};