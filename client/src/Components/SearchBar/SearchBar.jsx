import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { useHistory } from 'react-router-dom'
import s from './SearchBar.module.css';
// import lupa from '../../image/lupita.png';

export const SearchBar = () => {
    const lupa = "https://res.cloudinary.com/pflet/image/upload/v1662686104/Let/image/lupita_skorrj.png"
    const dispatch = useDispatch();
    const history = useHistory()
    const parameters = useSelector(state => state.parameters);
    const [input, setInput] = useState('')
    
    const handleInputChange = e => {
        e.preventDefault()
        setInput(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if (!input) return
        dispatch(setParameters({...parameters, search: {selected: ['search'], search: input}}))
        dispatch(setCurrentPage(1));
        setInput('')
        history.push('/home')
    }

    return (
        <form className={s.searchBar} onSubmit={handleSubmit}>
            <button className={s.lupaBtn}><img src={lupa} className={s.lupa} alt='lupa' /></button>
            <input className= {s.text} type='text' placeholder='Buscar..' value={input} onChange={handleInputChange} />
        </form>
    )
};

