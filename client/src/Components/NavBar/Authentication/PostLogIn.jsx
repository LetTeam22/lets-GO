import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllUsers, createUser, getUser, getAllFavorites, getBookingsByUserEmail } from '../../../Redux/actions';
import Loading from '../../Loading/Loading';
import Rejected from './Rejected';
import s from './PostLogIn.module.css';
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID3;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID3;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY3;

export default function PostLogIn() {
    const postlogin = "https://res.cloudinary.com/pflet/image/upload/v1662686157/Let/image/postlogin_esasff.png"
    const dispatch = useDispatch()
    const { user, isLoading } = useAuth0()
    const history = useHistory()
    const allUsers = useSelector(state => state.allUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect( () => {
        if (user?.email) dispatch(getBookingsByUserEmail(user?.email))
        if (user?.email) dispatch(getAllFavorites(user?.email))
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
    
    if(isLoading) return <Loading/>
    localStorage.setItem('email', user?.email);

    const userLogged = allUsers.find(us => us.email === user?.email)
    if(userLogged && userLogged.status !== 'active') return <Rejected/>

    const goBack = async (e) => {
        e.preventDefault();
        await dispatch(createUser({ email: user.email }))
        dispatch(getUser(user?.email))
        dispatch(getAllFavorites(user?.email))
        history.push(localStorage.getItem('url'))
        localStorage.removeItem('url')
        sendEmail(e);
    }

    const goProfile = async (e) => {
        e.preventDefault();
        await dispatch(createUser({ email: user.email }))
        dispatch(getUser(user?.email))
        dispatch(getAllFavorites(user?.email))
        history.push('/bike/profile')
        sendEmail(e);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: user.email }, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

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