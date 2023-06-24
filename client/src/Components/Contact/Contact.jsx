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
import { postContactWithApiGPT, postContact, cleanContact} from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID2;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID2;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY2;

export const Contact = () => {
  const history = useHistory();
  const logo = 'https://res.cloudinary.com/pflet/image/upload/v1663098045/Let/image/logo1_bdo7fl.png';
  const form = useRef();
  const dispatch = useDispatch();
  const contactResponse = useSelector((state) => state.contactResponse);
  const [loading, setLoadin] = useState(false)

  const [input, setInput] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if(typeof(contactResponse) === 'string') {
        setLoadin(false)
        swal({
            text: contactResponse,
            icon: 'success'
        })
        dispatch(cleanContact(false))
        history.push('/home')
    };
  }, [contactResponse]);

  const sendEmail = (e) => {
    e.preventDefault();
    // guarda el msj de contacto
    // dispatch(postContact(input))

    // guarda el msj de contacto y procesala con api GPT
    dispatch(postContactWithApiGPT(input));
    setLoadin(true);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
            console.log('todo bien', result);
        }, (error) => {
            console.log('todo mal', error)
        });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const disabled = () => {
    if (!!input.name && !!input.email && !!input.message) return false;
    else return true;
  };

  return (
    <div className={s.container}>
      <Chatbot />
      {!!loading ? (
        <div className={s.loading}>
          <div className={s.spinner}></div>
          <img src={logo} alt='logo' className={s.logo} />
          <p className={s.p}>Aguarde unos segundos por favor...</p>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} className={s.form}>
          <img src={logo} alt='logo' className={s.logo} />
          <p className={s.p}>
            RELLENÁ EL SIGUIENTE FORMULARIO SI QUERÉS CONTACTARTE CON NOSOTROS
          </p>

          <div className={s.containerInputs}>
            <FaRegUser color='#F9B621' size='2rem' />
            <input
              type='text'
              name='name'
              placeholder='Nombre'
              value={input.name}
              onChange={(e) => handleChange(e)}
              maxLength='30'
              className={s.inputs}
            />
            <span className={s.required}>*</span>
          </div>

          <div className={s.containerInputs}>
            <BsPhone color='#F9B621' size='2rem' />
            <input
              type='number'
              name='phone'
              placeholder='Teléfono'
              value={input.phone}
              onChange={(e) => handleChange(e)}
              maxLength='12'
              className={s.inputs}
            />
            <span className={s.span}>*</span>
          </div>

          <div className={s.containerInputs}>
            <HiOutlineMail color='#F9B621' size='2rem' />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={input.email}
              onChange={(e) => handleChange(e)}
              maxLength='30'
              className={s.inputs}
            />
            <span className={s.required}>*</span>
          </div>

          <div className={s.containerInputs}>
            <BiMessageEdit color='#F9B621' size='2rem' />
            <div className={s.textArea}>
              <textarea
                name='message'
                placeholder='Escribe aqui tu mensaje'
                value={input.message}
                onChange={(e) => handleChange(e)}
                maxLength='500'
                className={s.textAr}
              />
            </div>
            <span className={s.required}>*</span>
          </div>

          <div className={s.containerBtn}>
            <TbSend color='white' size='2rem' />
            <input
              className={s.inputSend}
              type='submit'
              value='Enviar'
              disabled={disabled()}
            />
          </div>
        </form>
      )}
    </div>
  );
};
