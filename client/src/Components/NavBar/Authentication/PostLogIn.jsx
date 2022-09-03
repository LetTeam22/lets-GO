import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, getUser } from '../../../Redux/actions';
import s from './PostLogIn.module.css';
import postlogin from '../../../image/postlogin.png';

export default function PostLogIn () {
    const dispatch = useDispatch()
    const { user } = useAuth0()
    const history = useHistory()

    const goBack = () => {
        dispatch(createUser({email:user.email}))
        dispatch(getUser(user.email))
        history.push(localStorage.getItem('url'))
        localStorage.removeItem('url')
    }
    const goProfile = () => {
        dispatch(createUser({email:user.email}))
        dispatch(getUser(user.email))
        history.push('/bike/profile')
    }

    return (
        <div className={s.background}>
            <div className={s.buttons}>
                <img src={postlogin} className={s.postlogin} alt='postlogin' ></img>
                <button className={s.btnBack} onClick={goBack}>Volver</button>
                <button className={s.btnProfile} onClick={goProfile}>Revisa tu perfil</button>
            </div>
        </div>
    )
}