import React, { useState } from 'react';
import s from './CardExperiences.module.css'
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';




const CardExperience = ({ imgExperience, textExperience, firstName}) => {

    const [ like, setLike ] = useState(false);
    
    const handleLike = (e) => {
        e.preventDefault();
        setLike(!like);
    }

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={imgExperience} alt='img not found' /> 
            <div className={s.description}>
                <h2 className={s.h2}>Los leters andan diciendo...</h2>
                <h1 className={s.h1}>{firstName}</h1>
                <p className={s.p}>{textExperience}</p>
                {
                    like 
                    ? <button onClick={e => handleLike(e)} className={s.iconBtn}><AiFillLike size='1.5rem' color='#F9B621' /></button>
                    : <button onClick={e => handleLike(e)} className={s.iconBtn}><BiLike size='1.5rem' color='#F9B621'/></button>
                }
            </div>
        </div >
    )
};

export default CardExperience