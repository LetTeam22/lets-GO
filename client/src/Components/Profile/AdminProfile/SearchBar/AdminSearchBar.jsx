import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import s from './AdminSearchBar.module.css';
import lupa from '../../../../image/lupita.png';
import {getUser} from '../../../../Redux/actions/index'

export const AdminSearchBar = () => {
    
    const dispatch = useDispatch();
    const [input, setInput] = useState('')
    
    const handleInputChange = e => {
        e.preventDefault()
        setInput(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getUser(input.toLocaleLowerCase()))
        setInput('')
    }

    return (
        <form className={s.searchBar} onSubmit={handleSubmit}>
            <button className={s.lupaBtn}><img src={lupa} className={s.lupa} alt='lupa' /></button>
            <input className= {s.text} type='text' placeholder='Buscar por email..' value={input} onChange={handleInputChange} />
        </form>
    )
};