import React, { useState } from 'react';
import s from './CardExperiences.module.css'
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';


const CardExperience = ({ imgExperience, textExperience, firstName, socket, email}) => {

    const { user, isAuthenticated } = useAuth0();
    const [ like, setLike ] = useState(false);
    
    const handleLike = (e, mail) => {
        e.preventDefault();
        setLike(true);
        socket.emit('likeExperience', {
            senderName: user.name,
            receiverName: mail
        })
    }

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={imgExperience} alt='img not found' /> 
            <div className={s.description}>
                <h2 className={s.h2}>Los leters andan diciendo...</h2>
                <h1 className={s.h1}>{firstName}</h1>
                <p className={s.p}>{textExperience}</p>
                {
                    isAuthenticated
                    ? like 
                        ? <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><AiFillLike size='1.5rem' color='#F9B621' /></button>
                        : <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><BiLike size='1.5rem' color='#F9B621'/></button>
                    : <></>
                }
            </div>
        </div >
    )
};

export default CardExperience