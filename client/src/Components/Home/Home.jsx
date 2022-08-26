import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Home.module.css';
import { GoLocation } from 'react-icons/go';
import { Link } from 'react-router-dom';
import {VscChevronRight, VscChevronLeft} from 'react-icons/vsc';


import Destacados from '../Destacados/Destacados';
import fondo from '../../image/img_fondo1.png';

import Outstanding from '../Outstanding/outstanding.jsx'

import { getBikes } from '../../Redux/actions/'

// import Outstanding from '../Outstanding/outstanding.jsx'


// import Destacados from '../Destacados/Destacados';




export default function Home () {

    const dispatch = useDispatch();
    const bikes =  useSelector(state => state.bikes);

    if(!bikes.length) {
        dispatch(getBikes());
    }



    return (
        <div className={s.container} >


            
            <div className={s.location}>
                <h3 className={s.title}>San Miguel de Tucuman, Argentina</h3>
                <GoLocation color='#c4c3c3' size='26px' />
            <div/>
            
            <img src={fondo} className={s.fondo} alt="fondo" />
            <p className={s.text}>para mantener el equilibrio, segui en movimiento</p>
            
            <button className={s.searchBtn}>BUSCAR BICI</button>
            
            <div className={s.flechas}>
                <VscChevronRight color='white' size='50px' cursor='pointer' />
                <VscChevronLeft color='white' size='50px' cursor='pointer' />

 
            
            {/* <Link to={'/privateRoute'} className={s.prueba}>
                <button>Go to the private component</button>

            </Link> */}

            <Outstanding></Outstanding>

            {/* <Destacados /> */}
        </div>
    )
}