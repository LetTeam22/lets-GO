import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, getUser } from '../../../Redux/actions';
import s from './PostLogIn.module.css';
import postlogin from '../../../image/postlogin.png';
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID3;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID3;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY3;

export default function PostLogIn () {
    const dispatch = useDispatch()
    const { user } = useAuth0()
    const history = useHistory()

    const goBack = (e) => {
        e.preventDefault();
        dispatch(createUser({email:user.email}))
        dispatch(getUser(user.email))
        history.push(localStorage.getItem('url'))
        localStorage.removeItem('url')
        sendEmail(e);
    }
    const goProfile = (e) => {
        e.preventDefault();
        dispatch(createUser({email:user.email}))
        dispatch(getUser(user.email))
        history.push('/bike/profile')
        sendEmail(e);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {email: user.email}, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className={s.background}>
            <div className={s.buttons}>
                <img src={postlogin} className={s.postlogin} alt='postlogin' ></img>
                <button className={s.btnBack} onClick={e => goBack(e)}>Volver</button>
                <button className={s.btnProfile} onClick={e => goProfile(e)}>Revisa tu perfil</button>
            </div>
        </div>
    )
}