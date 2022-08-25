import React from 'react'
import s from './SearchBar.module.css';
import lupa from '../../image/lupita.png'

const SearchBar = () => {
    
    return (
        <div className={s.searchBar}>
            <img src={lupa} className={s.lupa}></img>
            <input type='text' placeholder='Buscar..'></input>
        </div>
    )
}

export default SearchBar;