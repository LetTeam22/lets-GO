import React, { useEffect, useRef } from 'react';
import s from './Contact.module.css';
import logo from '../../image/logo.png';
import emailjs from '@emailjs/browser';
import { FaRegUser } from 'react-icons/fa';
import { BsPhone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { BiMessageEdit } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { useState } from 'react';
import swal from "sweetalert";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID2;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID2;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY2;

export const Contact = () => {

    const form = useRef();

    const [input, setInput] = useState({
        user_name: '',
        user_number: '',
        user_email: '',
        message: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                swal({
                    title: 'Mensaje enviado con exito!',
                    text: "Pronto nos estaremos contactando con usted. Muchas gracias por comunicarse con Let's GO",
                    icon: "success"
                })
                console.log(result.text);
            }, (error) => {
                swal({
                    title: 'Algo no salio bien',
                    text: 'Vuelve a intentarlo y si el problema persiste por favor utiliza otro de nuestros medios de comunicacion. Muchas gracias',
                    icon: 'error'
                })
                console.log(error.text);
            });
        setInput({
            user_name: '',
            user_number: '',
            user_email: '',
            message: '',
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }


    return (
        <div className={s.container} >
            <form ref={form} onSubmit={sendEmail} className={s.form} >
                <img src={logo} alt='logo' className={s.logo} />
                <p>RELLENA EL SIGUIENTE FORMULARIO SI QUIERES CONTACTARTE CON NOSOTROS</p>
                <div className={s.containerInputs} >
                    <FaRegUser color='#F9B621' size='2rem'/>
                    <div className={s.inputs} ><input type="text" name="user_name" placeholder='Name' value={input.user_name} onChange={e => handleChange(e)} /></div>
                </div>
                <div className={s.containerInputs} >
                    <BsPhone color='#F9B621' size='2rem' />
                    <div className={s.inputs} ><input type="number" name="user_number" placeholder='Telefono' value={input.user_number} onChange={e => handleChange(e)} /></div>
                </div>
                <div className={s.containerInputs} >
                    <HiOutlineMail color='#F9B621' size='2rem' />
                    <div className={s.inputs} ><input type="email" name="user_email" placeholder='Email' value={input.user_email} onChange={e => handleChange(e)} /></div>
                </div>
                <div className={s.containerInputs} >
                    <BiMessageEdit color='#F9B621' size='2rem' />
                    <div className={s.textArea} ><textarea name="message" placeholder='Escribe aqui tu mensaje' value={input.message} onChange={e => handleChange(e)} /></div>
                </div>
                <div className={s.containerBtn}>
                    <TbSend color='white' size='2rem'/>
                    <input type="submit" value="Send" />
                </div>
            </form>
        </div>
    )
};
