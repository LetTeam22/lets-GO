import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './CardExperiences.module.css'
import { BiLike, BiTrash, BiEdit, BiSave } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import { updateExperience, updateExperiencesState } from '../../Redux/actions';
import swal from "sweetalert";

export const CardExperience = ({ id, imgExperience, textExperience, firstName, startDate, endDate, bikes, socket, email}) => {
    
    const dispatch= useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences)
    
    const { user, isAuthenticated } = useAuth0();
    const [ like, setLike ] = useState(false);
    const [ input, setInput ] = useState({
        id: '',
        text: ''
    });

    const handleLike = (e, mail) => {
        e.preventDefault();
        if(!like) {
            socket.emit('likeExperience', {
                senderName: user.name,
                receiverName: mail,
                senderEmail: user.email
            }); 
        };
        setLike(!like);
    }

    const handleInputChange = e => {
        e.preventDefault();
        setInput({...input, text: e.target.value})
    }

    const handleEdit = e => {
        e.preventDefault();
        setInput({
            id: id,
            text: textExperience
        })
    }

    const handleDelete = e => {
        e.preventDefault();
        swal({
            title: "¿Estás seguro que querés eliminar la experiencia?",
            icon: "warning",
            buttons: {
              cancel: {
                text: "Cancelar",
                value: null,
                visible: true,
                closeModal: true,
              },
              confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: s.btnSwal,
                closeModal: true,
              },
            },
        }).then((value) => {
            if (value) {
              dispatch(updateExperience({
                  idExperience: id,
                  status: 'deleted'
              }))
              const newExperiences = allExperiences.map(e => e.idExperience === id ? {...e, status: 'deleted'} : e)
              dispatch(updateExperiencesState(newExperiences))
            }
        });
    }

    const handleSave = e => {
        e.preventDefault();
        dispatch(updateExperience({
            idExperience: id,
            textExperience: input.text
        }))
        const newExperiences = allExperiences.map(e => e.idExperience === id ? {...e, textExperience: input.text} : e)
        dispatch(updateExperiencesState(newExperiences))
        setInput({
            id: '',
            text: ''
        })
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
                <>
                {
                    id === input.id ? 
                    <textarea className={s.edit} type='text' value={input.text} onChange={handleInputChange} /> :
                    <p className={s.p}>{textExperience}</p>
                }
                </>
                <div className={s.iconCont}>
                    {
                        isAuthenticated
                        ? like
                        ?   (
                            <div className={s.containerLikes}>
                                        {/* <span className={s.likes}>{numberOfLikes}</span> */}
                                        <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><AiFillLike size='1.5rem' color='#F9B621' /></button>
                                    </div>
                                )
                            :   (
                                <div className={s.containerLikes}>
                                        {/* <span className={s.likes}>{numberOfLikes}</span> */}
                                        <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><BiLike size='1.5rem' color='#F9B621' /></button>
                                    </div>
                                ) 
                                : <></>
                            }
                    {
                        isAuthenticated && user.email === email &&
                        <>
                        {
                            id === input.id ? 
                            <button onClick={e =>  handleSave(e, email)} className={s.iconBtn}><BiSave size='1.5rem' color='#F9B621' /></button> :
                            <>
                                <button onClick={e =>  handleEdit(e, email)} className={s.iconBtn}><BiEdit size='1.5rem' color='#F9B621' /></button>
                                <button onClick={e =>  handleDelete(e, email)} className={s.iconBtn}><BiTrash size='1.5rem' color='#F9B621' /></button>
                            </> 
                        }
                        </> 
                    }
                </div>
            </div>
        </div >
    )
};