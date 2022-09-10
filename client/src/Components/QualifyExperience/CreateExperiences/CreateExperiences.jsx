/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { postExperience } from '../../../Redux/actions';
import s from './CreateExperiences.module.css'
import { IoAttach } from 'react-icons/io5';
import swal from 'sweetalert';
import { BiMessageEdit } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';


export const CreateExperiences = () => {

  const logo = 'https://res.cloudinary.com/pflet/image/upload/v1662686136/Let/image/logo_vwis1a.png'
  const url = 'https://api.cloudinary.com/v1_1/pflet/image/upload'
  const dispatch = useDispatch();
  const history = useHistory();
  const userBookings = useSelector(state => state.userBookings);
  const form = useRef();
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    textExperience: '',
    imgExperience: '',
    bookingIdBooking: userBookings.idBooking,
    userName: ''
  });

  const validate = input => {
    let errors = {}
    if (!input.textExperience) errors.textExperience = 'Debe ingresar una reseña';
    if (!input.userName) errors.userName = 'Debes ingresar tu nombre';
    return errors
  };

  // función que sube la foto cargada por el usuario a Cloudinary
  const upload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Experiences'); // preset de Cloudinary y directorio donde se alojará la imagen
    const res = await axios.post(url, data)
    const file = await res.data;
    setInput({
      ...input,
      imgExperience: file.public_id 
    })
  };

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.textExperience || !input.userName) {
      swal('Por favor, completá los campos requeridos')
    } else {
      dispatch(postExperience(input))
      setInput({
        textExperience: '',
        imgExperience: '',
        bookingIdBooking: userBookings.idBooking,
        userName: ''
      })
      swal('Gracias por contarnos tu experiencia')
      history.push('/allExperiencies')
    }
  };

  return (
      <form ref={form} onSubmit={handleSubmit} className={s.form} >
        {/* <img src={logo} alt='logo' className={s.logo} /> */}
        <div className={s.containerT} >
          <FaUserAlt color='#F9B621' size='2rem' />
          <div className={s.inputs} ><input type='text' name='userName' placeholder='Name' value={input.userName} onChange={e => handleChange(e)} /></div>
        </div>
        <div className={s.containerT} >
          <BiMessageEdit color='#F9B621' size='2rem' />
          <div className={s.textArea} ><textarea value={input.textExperience}
            onChange={handleChange} name='textExperience' placeholder='Sumate a los leters que cuentan historias...' /></div>
        </div>
        <div className={s.containerT}>
          <IoAttach color='#F9B621' size='2rem' />
          <input type='file' onChange={upload} name='file' style={{ color: 'white', fontFamily: 'Roboto' }} />
        </div>
        <div className={s.containerBtn} >
          <TbSend color='white' size='2rem' />
          <input type='submit' value='Enviar' />
        </div>
      </form>
  )
};