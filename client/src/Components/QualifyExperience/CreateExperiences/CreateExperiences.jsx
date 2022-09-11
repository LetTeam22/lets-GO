import React, { useEffect, useRef } from 'react';
import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { postExperience, getAllExperiences } from '../../../Redux/actions';
import s from './CreateExperiences.module.css'
import { IoAttach } from 'react-icons/io5';
import swal from 'sweetalert';
import { BiMessageEdit } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
import Loading from '../../Loading/Loading';

export const CreateExperiences = () => {

  const url = 'https://api.cloudinary.com/v1_1/pflet/image/upload'
  const dispatch = useDispatch();
  const history = useHistory();
  const userBookings = useSelector(state => state.userBookings);
  const user = useSelector(state => state.user);
  const form = useRef(); // consultar con sole
  const allExperiences = useSelector(state => state.allExperiences);
  const [loading, setLoading] = useState(false);
  const [toUpload, setToUpload] = useState('');
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    textExperience: '',
    imgExperience: '',
    bookingIdBooking: userBookings.idBooking,
    firstName: '' 
  });

  useEffect(() => {
    dispatch(getAllExperiences());
  },[dispatch]);

  const validate = input => {
    let errors = {}
    if (!input.textExperience) errors.textExperience = 'Debe ingresar una reseña';
    if (!input.firstName) errors.firstName = 'Debes ingresar tu nombre';
    return errors
  };

  const handleChange = e => {
    if (e.target.id === "fileToUpload"){
      setToUpload(e.target.files[0])
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      firstName: user.firstName !== null ? user.firstName : e.target.value

    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
      firstName: user.firstName !== null ? user.firstName : e.target.value
    }))
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData()
    data.append('file',toUpload)
    data.append('upload_preset','Experiences')
    const res = toUpload? await axios.post(url, data):"";
    const file = toUpload? await res.data:"";
    console.log("el Input",input)
    if(file?.url || false) await dispatch(postExperience({...input, imgExperience: file.url, }))
    else await dispatch(postExperience({...input, imgExperience: undefined, }))
    setInput({
      textExperience: '',
      imgExperience: '',
      bookingIdBooking: userBookings.idBooking,
      firstName: ''
    })
    setLoading(false)
    swal('Gracias por contarnos tu experiencia')
    history.push('/allExperiencies')
  };

  const disabled = Object.keys(errors).length || !input.firstName
  const alreadyQualified = allExperiences.find(e => e.bookingIdBooking === userBookings.idBooking)
  if (loading) return <Loading/>;
  

  return ( 
    <>
      { alreadyQualified ?
        <div className={s.form}>
          <span className={s.span}>Ya cargaste una reseña para esta experiencia</span> 
        </div>
        : 
        <form ref={form} onSubmit={handleSubmit} className={s.form} >
          <div className={s.containerT} >
            <FaUserAlt color='#F9B621' size='2rem' />
            { user.firstName !== null
              ? <span className={s.span}>{user.firstName}</span>
              : <div className={s.inputs}>
                  <input type='text' name='firstName' placeholder='Name' value={input.firstName} onChange={e => handleChange(e)} />
                </div>   
            }
          </div>
            { errors.firstName && <span className={s.redspan}>{errors.firstName}</span> }
          <div className={s.containerT} >
            <BiMessageEdit color='#F9B621' size='2rem' />
            <div className={s.textArea} ><textarea value={input.textExperience}
              onChange={handleChange} name='textExperience' placeholder='Sumate a los leters que cuentan historias...' /></div>
          </div>
          { errors.textExperience && <span className={s.redspan}>{errors.textExperience}</span> }
          <div className={s.containerT}>
            <IoAttach color='#F9B621' size='2rem' />
            <input id='fileToUpload' type='file' onChange={handleChange} name='file' style={{ color: 'white', fontFamily: 'Roboto' }} />
          </div>
          <div className={s.containerBtn} >
            <TbSend color='white' size='2rem' />
            <input disabled={disabled} type='submit' value='Enviar' />
          </div>
        </form>
      }
    </>
  )
};
