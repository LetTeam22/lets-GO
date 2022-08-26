import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogIn.module.css';
import persona from '../../../image/persona.png';

export default function LogIn () {
    
    const { loginWithRedirect} = useAuth0();

    return (
        <>
            <span onClick={ loginWithRedirect } className={s.loginSpan}>Registrarse</span>
            <button className={s.personaBtn} onClick={ loginWithRedirect }><img src={persona} className={s.persona} alt='persona' ></img></button>
        </>
    )
}

