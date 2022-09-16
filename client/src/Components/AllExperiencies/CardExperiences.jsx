import React, { useState } from 'react';
import s from './CardExperiences.module.css'
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { addLikeToDb, removeLikeFromDb } from '../../Redux/actions';


export const CardExperience = ({ imgExperience, textExperience, firstName, startDate, endDate, bikes, socket, email, idExperience}) => {

    const { user, isAuthenticated } = useAuth0();
    const likes = useSelector(state => state.likes);
    const dispatch = useDispatch();

    const handleLike = (e, mail) => {
        e.preventDefault();
        const alreadyLike = likes.find(e => e.idExperience === idExperience);
        if(!alreadyLike) {
            if(user?.email) dispatch(addLikeToDb({idExperience: idExperience, email: user?.email}));
            socket.emit('likeExperience', {
                senderName: user.name,
                receiverName: mail,
                senderEmail: user.email
            }); 
        } else {
            if(user?.email) dispatch(removeLikeFromDb({idExperience, email: user.email}));
        }
    }

    const experienceIsLike = (idExperience) => {
        return likes.find(e => e.idExperience === idExperience) ? true : false;
    }

    return (
        <div className={s.blogCard} >
            <img className={s.imgcard} src={imgExperience} alt='img not found' /> 
            <div className={s.description}>
                <h2 className={s.h2}>Los leters andan diciendo...</h2>
                <h1 className={s.name}>{firstName}</h1>
                <h1 className={s.h1}>{startDate} / {endDate}</h1>
                <div className={s.containH1}> 
                    { bikes.map( b =>  <h1 className={s.h1}> {b.name} ・ </h1> )}
                </div> 
                    <p className={s.p}>{textExperience}</p>
                {
                    isAuthenticated
                    ? experienceIsLike(idExperience)
                        ?   <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><AiFillLike size='1.5rem' color='#F9B621' /></button>    
                        :   <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><BiLike size='1.5rem' color='#F9B621' /></button>
                    : <></>
                }
            </div>
        </div >
    )
};