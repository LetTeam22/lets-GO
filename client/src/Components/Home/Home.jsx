import React from 'react';
import s from './Home.module.css';
import { GoLocation } from 'react-icons/go';
import { Link } from 'react-router-dom';
import {VscChevronRight, VscChevronLeft} from 'react-icons/vsc';
import Outstanding from '../Outstanding/outstanding.jsx'
// import Destacados from '../Destacados/Destacados';



export default function Home () {
    return (
        <div className={s.container} >
            <div className={s.home}>  
                <div className={s.location}>
                    <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
                    <GoLocation color='#c4c3c3' size='26px' />
                </div>
                <p className={s.text}>para mantener el equilibrio, seguí en movimiento</p>
                <button className={s.searchBtn}>BUSCAR BICI</button>
                <div className={s.flechas}>
                    <VscChevronRight color='white' size='50px' cursor='pointer' />
                    <VscChevronLeft color='white' size='50px' cursor='pointer' />
                </div>
            </div>
            <Link to={'/privateRoute'} className={s.prueba}>
                <button>Go to the private component</button>
            </Link>
            <Outstanding></Outstanding>
            {/* <Destacados /> */}
        </div>

    )
}