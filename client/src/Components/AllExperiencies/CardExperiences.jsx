import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './CardExperiences.module.css'
import { BiLike, BiTrash, BiEdit, BiSave } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import { addLikeToDb, removeLikeFromDb, updateExperience, updateExperiencesState } from '../../Redux/actions';
import swal from 'sweetalert';

export const CardExperience = ({ imgExperience, textExperience, firstName, startDate, endDate, bikes, socket, email, idExperience}) => {

    const { user, isAuthenticated } = useAuth0();
    const likes = useSelector(state => state.likes);
    const dispatch = useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences)
    const [ input, setInput ] = useState({
        id: '',
        text: ''
    });

    const handleLike = (e, mail) => {
        e.preventDefault();
        if(!isAuthenticated) {
            swal({
                title: "PRECAUCIÓN",
                text: "Debés loguearte primero",
                icon: "warning",
                button: {
                    text: "Ok",
                    value: true,
                    visible: true,
                    className: s.btnSwal,
                    closeModal: true,
                },
            });
        } else {
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
    }

    const experienceIsLike = (idExperience) => {
        return likes.find(e => e.idExperience === idExperience) ? true : false;
    }

    const handleInputChange = e => {
        e.preventDefault();
        setInput({...input, text: e.target.value})
    }

    const handleEdit = e => {
        e.preventDefault();
        setInput({
            id: idExperience,
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
                  idExperience: idExperience,
                  status: 'deleted'
              }))
              const newExperiences = allExperiences.map(e => e.idExperience === idExperience ? {...e, status: 'deleted'} : e)
              dispatch(updateExperiencesState(newExperiences))
            }
        });
    }

    const handleSave = e => {
        e.preventDefault();
        dispatch(updateExperience({
            idExperience: idExperience,
            textExperience: input.text
        }))
        const newExperiences = allExperiences.map(e => e.idExperience === idExperience ? {...e, textExperience: input.text} : e)
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
                    idExperience === input.id ? 
                    <textarea className={s.edit} type='text' value={input.text} onChange={handleInputChange} /> :
                    <p className={s.p}>{textExperience}</p>
                }
                </>
                <div className={s.iconCont}>
                    {
                        experienceIsLike(idExperience)
                            ?   <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><AiFillLike size='1.5rem' color='#F9B621' /></button>    
                            :   <button onClick={e =>  handleLike(e, email)} className={s.iconBtn}><BiLike size='1.5rem' color='#F9B621' /></button>
                    }
                    {
                        isAuthenticated && user.email === email &&
                        <>
                        {
                            idExperience === input.id ? 
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