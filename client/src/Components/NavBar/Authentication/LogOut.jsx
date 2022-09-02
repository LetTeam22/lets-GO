import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogOut.module.css';
import { useHistory } from "react-router-dom";
import logedPerson from '../../../image/persona_logeada.png';
import Loading from '../../Loading/Loading';
import { useSelector } from "react-redux";

export default function LogOut() {
  const { logout, isLoading, user } = useAuth0();
  const history = useHistory();
  const userLogged = useSelector(state => state.user)
  const name = userLogged?.firstName || user?.email

  return (
    isLoading? <Loading/>
  :
  <>
  <span
        onClick={() => logout({ returnTo: window.location.origin })}
        className={s.loginSpan}
      >
        Log out
      </span>
      <div className={s.containerLog}>
        <button className={s.personaBtn} onClick={() => history.push('/bike/profile')}>
          <img src={logedPerson} className={s.persona} alt="persona"></img>
        </button>
        <span className={s.name}>{ name }</span>
      </div>
      </>
    
      );
    }
    