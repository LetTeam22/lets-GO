import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import s from './Menu.module.css'
import persona from '../../image/persona.png';
import carrito from '../../image/carrito.png';
import vector from '../../image/Vector.png';

const Menu = () => {


    return (
        <div className={s.menu}>
            <div className={s.dropdown}> 
                <span>BICICLETAS</span>  
            </div>
            <div className={s.options}>
                <span>AVENTURAS</span>
                <hr color="#F9B621" />
            </div>
            <div className={s.options}>
                <span>VENTAJAS</span>
                <hr color="#F9B621" />
            </div>
            <div className={s.options}>
                <span>EXPERIENCIAS</span>
                <hr color="#F9B621" />
            </div>
            <div className={s.options}>
                <span>CONTACTO</span>
                <hr color="#F9B621" />
            </div>
            <SearchBar />
            <div className={s.login}>
                <span className={s.loginSpan}>Registrarse</span>
                
                <img src={persona} className={s.persona}></img>
               
                
                <img src={carrito} className={s.carrito}></img>
            </div>
        </div>
    )
}

export default Menu;

