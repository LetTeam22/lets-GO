import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import s from './Menu.module.css'
import carrito from '../../image/carrito.png';

import LogIn from "../NavBar/Authentication/LogIn";


const Menu = () => {


    return (
        <div className={s.menu}>
            <div className={s.options} > 
                <span>BICICLETAS</span>
                <hr color="#F9B621" />
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
               
                <LogIn />
                
                {/* <HiOutlineShoppingBag size='40px' color="#F9B621" /> */}
                <button className={s.carritoBtn}><img className={s.carrito} src={ carrito } alt="carrito" /></button>
            </div>
        </div>
    )
}

export default Menu;

