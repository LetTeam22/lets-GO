/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import UploadImages from "./UploadImages";
import axios from "axios";
import { postExperience } from '../../Redux/actions';
import RenderCreateExp from "../Cloudinary/renderCreateExperience";
import s from "./CreateExperiences.module.css"
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./MaterialUIColors"
import { IoSend, IoAttach } from "react-icons/io5";
import swal from "sweetalert";
import { BiMessageEdit } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
// import logo from '../../image/logo.png';
// import { Link, useHistory } from "react-router-dom"


const CreateExperiences = () => {
  const logo ="https://res.cloudinary.com/pflet/image/upload/v1662686136/Let/image/logo_vwis1a.png"
  const dispatch = useDispatch();
  const form = useRef();
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    textExperience: "",
    imgExperience: "",
    //bookingIdBooking,
    //userIdUser
  })

  const history = useHistory()

  const validate = (input) => {
    let errors = {}

    if (!input.textExperience) errors.textExperience = "Debe ingresar una reseña"
    else if (input.textExperience.lenght < 30) errors.textExperience = "Ingrese como mínimo 30 caracteres"
    else if (input.textExperience.lenght > 280) errors.textExperience = "Su reseña no puede superar los 280 carcateres"
    return errors
  }

  const upload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Experiences");
    setLoading(true)

    const res = await axios.post("https://api.cloudinary.com/v1_1/pflet/image/upload", data)
    const file = await res.data;
    console.log(file)
    setInput({
      ...input,
      imgExperience: file.public_id
    })
    console.log(file.public_id)
    setLoading(false)
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log(input)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.textExperience || !input.imgExperience) {
      return swal("Por favor, completá los campos requeridos")
    } else if (errors.textExperience || errors.imgExperience) {
      return swal("Por favor, revisá los datos ingresados")
    } else {
      setErrors(validate(input))
      dispatch(postExperience(input))
      setInput({
        textExperience: "",
        imgExperience: "",
        //bookingIdBooking,
        //userIdUser
      })
      history.push('/allExperiencies')
    }
  }

  return (

    <div >
      <form ref={form} onSubmit={handleSubmit} className={s.form} >
        <img src={logo} alt='logo' className={s.logo} />

        <div className={s.containerT} >
          <FaUserAlt color='#F9B621' size='2rem' />
          <div className={s.inputs} ><input type="text" name="user_name" placeholder='Name' value={input.user_name} onChange={e => handleChange(e)} /></div>
        </div>

        <div className={s.containerT} >
          <BiMessageEdit color='#F9B621' size='2rem' />
          <div className={s.textArea} ><textarea value={input.textExperience}
            onChange={handleChange} name="textExperience" placeholder='Sumate a los leters que cuentan historias...' /></div>
        </div>
        

        <div className={s.containerT}>
        <IoAttach color='#F9B621' size='2rem' />
          <input type="file" onChange={upload} name="file" style={{color:"white", fontFamily:"Roboto"}}/>
        </div>



        <div className={s.containerBtn} >
          <TbSend color='white' size='2rem' />
          <input type="submit" value="Send" />
        </div>


      </form>
    </div>
  )



}

export default CreateExperiences;