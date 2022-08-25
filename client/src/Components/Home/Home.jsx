import React from 'react';
import NavBar from '../NavBar/NavBar'
import s from './Home.module.css';
import { GoLocation } from 'react-icons/go';

export default function Home () {
    return (
        <div className={s.home}>  
            <div className={s.location}>
                <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
                <GoLocation color='#BEB9B9' size='26px' />
            </div>
            <NavBar />
        </div>
    )
}