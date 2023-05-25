import React, { useEffect, useRef } from 'react';
import s from './Contact.module.css';
import { useHistory } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { FaRegUser } from 'react-icons/fa';
import { BsPhone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { BiMessageEdit } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { useState } from 'react';
import swal from 'sweetalert';
import Chatbot from '../ChatBot/ChatBot';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID2;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID2;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY2;

export const Contact = () => {

    const history = useHistory();
    const logo = 'https://res.cloudinary.com/pflet/image/upload/v1663098045/Let/image/logo1_bdo7fl.png'
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
                // post al back para guardar info
                swal({
                    title: 'Mensaje enviado con exito!',
                    text: "Pronto nos estaremos contactando con usted. Muchas gracias por comunicarse con let's GO",
                    icon: 'success'
                })
                console.log(result.text);
            }, (error) => {
                swal({
                    title: 'Algo no salio bien',
                    text: 'Vuelve a intentarlo y si el problema persiste por favor utiliza otro de nuestros medios de comunicacion. Muchas gracias',
                    icon: 'error'
                })
            });
        // borro el setInput ya que al irnos del componente se resetea el estado local
        history.push('/home')
    };

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const disabled = () => {
        if(!!input.user_name && !!input.user_email && !!input.message) return false
        else return true
    }

    return (
        <div className={s.container} >
            <Chatbot/>
            <form ref={form} onSubmit={sendEmail} className={s.form} >
                <img src={logo} alt='logo' className={s.logo} />
                <p className={s.p}>RELLENÁ EL SIGUIENTE FORMULARIO SI QUERÉS CONTACTARTE CON NOSOTROS</p>

                <div className={s.containerInputs} >
                    <FaRegUser color='#F9B621' size='2rem'/>
                        <input
                            type='text'
                            name='user_name'
                            placeholder='Nombre'
                            value={input.user_name}
                            onChange={e => handleChange(e)}
                            maxLength= '30'
                            className={s.inputs}
                        />
                    <span className={s.required}>*</span>
                </div>

                <div className={s.containerInputs} >
                    <BsPhone color='#F9B621' size='2rem' />
                        <input
                            type='number'
                            name='user_number'
                            placeholder='Teléfono'
                            value={input.user_number}
                            onChange={e => handleChange(e)}
                            maxLength= '12'
                            className={s.inputs}
                        />
                    <span className={s.span}>*</span>
                </div>

                <div className={s.containerInputs} >
                    <HiOutlineMail color='#F9B621' size='2rem' />
                        <input 
                            type='email'
                            name='user_email'
                            placeholder='Email'
                            value={input.user_email}
                            onChange={e => handleChange(e)}
                            maxLength= '30'
                            className={s.inputs}
                        />
                    <span className={s.required}>*</span>
                </div>

                <div className={s.containerInputs} >
                    <BiMessageEdit color='#F9B621' size='2rem' />
                    <div className={s.textArea} >
                        <textarea
                            name='message'
                            placeholder='Escribe aqui tu mensaje'
                            value={input.message}
                            onChange={e => handleChange(e)}
                            maxLength= '500'
                            className={s.textAr}
                        />
                    </div>
                    <span className={s.required}>*</span>
                </div>

                <div className={s.containerBtn}>
                    <TbSend color='white' size='2rem'/>
                    <input className={s.inputSend} type='submit' value='Enviar' disabled={disabled()}/>
                </div>
            </form>
        </div>
    )
};
