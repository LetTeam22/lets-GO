import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogIn.module.css';
import persona from '../../../image/persona.png';
import { useHistory } from "react-router-dom";

export default function LogIn () {
    const { loginWithRedirect} = useAuth0();
    const history = useHistory()

    const login = () => {
        localStorage.setItem('url',history.location.pathname)
        loginWithRedirect()
    }

    return (
        <>
            <span onClick={ login } className={s.loginSpan}>Registrarse</span>
            <button className={s.personaBtn} onClick={ login }>
                <img src={persona} className={s.persona} alt='persona' ></img>
            </button>
        </>
    )
}

