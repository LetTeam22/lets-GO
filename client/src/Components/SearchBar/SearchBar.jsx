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
        const search = input
        setInput('')
        dispatch(setCurrentPage(1));
        if (search.includes('bici')) {
            dispatch(setParameters({...parameters, search: {selected: [], search: ''}}))
            return history.push('/home')
        }
        if (search.includes('accesorio')) {
            dispatch(setParameters({...parameters, search: {selected: [], search: ''}}))
            return history.push('/allAccessories')
        }
        if (search.includes('aventura')) {
            dispatch(setParameters({...parameters, search: {selected: [], search: ''}}))
            return history.push('/adventure')
        }
        if (search.includes('experiencia')) {
            dispatch(setParameters({...parameters, search: {selected: [], search: ''}}))
            return history.push('/allExperiencies')
        }
        if (search.includes('contact')) {
            dispatch(setParameters({...parameters, search: {selected: [], search: ''}}))
            return history.push('/contact')
        }
        if (search.includes('perfil') || search.includes('reserva') || search.includes('favorit')) {
            dispatch(setParameters({...parameters, search: {selected: [], search: ''}}))
            return history.push('/bike/profile')
        }
        dispatch(setParameters({...parameters, search: {selected: ['search'], search: search}}))
        history.push('/home')
    }

    return (
        <form className={s.searchBar} onSubmit={handleSubmit}>
            <button className={s.lupaBtn}><img src={lupa} className={s.lupa} alt='lupa' /></button>
            <input className= {s.text} type='text' placeholder='Buscar..' value={input} onChange={handleInputChange} />
        </form>
    )
};

