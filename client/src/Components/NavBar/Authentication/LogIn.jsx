import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogIn.module.css';
import persona from '../../../image/persona.png';
import { saveURL } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

export default function LogIn () {
    const dispatch = useDispatch()
    const { loginWithRedirect} = useAuth0();

    const login = () => {
        dispatch(saveURL(window.location.href))
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

