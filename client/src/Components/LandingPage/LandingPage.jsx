import React from 'react';
import s from './LandingPage.module.css';
import image from '../../image/img_landing.png';
import NavBar from '../NavBar/Navbar';

export default function LandingPage () {
    return (
        <div>
            <h3 className={s.location}>San Miguel de Tucuman, Argentina</h3>
            <img src={image} alt="landing" />
            <NavBar />       
        </div>
    );
};
