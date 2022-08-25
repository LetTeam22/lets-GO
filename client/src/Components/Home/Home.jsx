import React from 'react';
import s from './Home.module.css';
import { GoLocation } from 'react-icons/go';
import { Link } from 'react-router-dom';


export default function Home () {
    return (
        <>
            <div className={s.home}>  
                <div className={s.location}>
                    <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
                    <GoLocation color='#BEB9B9' size='26px' />
                </div>
            </div>
            <Link to={'/privateRoute'} className={s.prueba}>
            <button>Go to the private component</button>
            </Link>
        </>

    )
}