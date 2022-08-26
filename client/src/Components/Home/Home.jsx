import React from 'react';
import s from './Home.module.css';
import { GoLocation } from 'react-icons/go';
import {VscChevronRight, VscChevronLeft} from 'react-icons/vsc';

export default function Home () {
    return (
            <div className={s.home}>  
                <div className={s.location}>
                    <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
                    <GoLocation color='#A4A3A3' size='26px' />
                </div>
                <p className={s.text}>para mantener el equilibrio, segui en movimiento</p>
                <button className={s.searchBtn}>BUSCAR BICI</button>
                <div className={s.flechas}>
                    <VscChevronRight color='white' size='50px' cursor='pointer' />
                    <VscChevronLeft color='white' size='50px' cursor='pointer' />
                </div>
            </div>    
    )
}