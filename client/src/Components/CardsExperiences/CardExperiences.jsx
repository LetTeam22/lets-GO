import React, { useState } from 'react';
import s from './CardExperiences.module.css'
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';


const CardExperience = ({ imgExperience, textExperience, firstName, startDate, endDate, bikes, socket}) => {

    const { user, isAuthenticated } = useAuth0();
    const [ like, setLike ] = useState(false);
    
    const handleLike = (e) => {
        e.preventDefault();
        setLike(!like);
        // socket.emit('sendNotification', {
        //     senderName: user.name,
        //     receiverName: firstName
        // })
    }

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={imgExperience} alt='img not found' /> 
            <div className={s.description}>
                <h2 className={s.h2}>Los leters andan diciendo...</h2>
                <h1 className={s.h1}>{firstName}</h1>
                <h1 className={s.h1}>Fecha de experiencia → {startDate} / {endDate}</h1>
                <div className={s.containH1}>Bici →
                    { bikes.map( b =>  <h1 className={s.h1}> {b.name} ・ </h1> )}
                </div> 
                    <p className={s.p}>{textExperience}</p>
                {
                    isAuthenticated
                    ? like 
                        ? <button onClick={e =>  handleLike(e)} className={s.iconBtn}><AiFillLike size='1.5rem' color='#F9B621' /></button>
                        : <button onClick={e =>  handleLike(e)} className={s.iconBtn}><BiLike size='1.5rem' color='#F9B621'/></button>
                    : <></>
                }
            </div>
        </div >
    )
};

export default CardExperience