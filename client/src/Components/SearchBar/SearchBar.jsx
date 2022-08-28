import React from 'react';
import s from './SearchBar.module.css';
import lupa from '../../image/lupita.png';

export const SearchBar = () => {
    
    return (
        <div className={s.searchBar}>
            <button className={s.lupaBtn}><img src={lupa} className={s.lupa} alt='lupa' /></button>
            <input className= {s.text}type='text' placeholder='Buscar..'></input>
        </div>
    )
};

