import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogOut.module.css';
import { useHistory } from "react-router-dom";
// import logedPerson from '../../../image/persona_logeada.png';
import Loading from '../../Loading/Loading';
import { useDispatch, useSelector } from "react-redux";
import RenderProfilePic from "../../Cloudinary/renderProfilePic";
import { getUser } from "../../../Redux/actions";

export default function LogOut() {

  const { logout, isLoading, user } = useAuth0();
  const history = useHistory();
  const userLogged = useSelector(state => state.user)
  const name = userLogged?.firstName || user?.email
  const logedPerson = "https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png"
  const dispatch = useDispatch();

  useEffect(() => {
    if(user) dispatch(getUser(user?.email));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    isLoading? <Loading/>
  :
  <>
  <span
        onClick={() => logout({ returnTo: window.location.origin })}
        className={s.loginSpan}
      >
        Cerrar sesión
      </span>
      <div className={userLogged && userLogged.profilePic ? s.containerProfilePic :s.containerLog}>
        <button className={userLogged && userLogged.profilePic ? s.profilePic : s.personaBtn} onClick={() => history.push('/bike/profile')}>
          {
            userLogged && userLogged.profilePic ?
            <RenderProfilePic publicId={userLogged.profilePic} alt={userLogged.email} /> :
              <img src={logedPerson} className={s.persona} alt="persona"></img>
          }
        </button>
        <span className={s.name}>{ name }</span>
      </div>
      </>
    
      );
    }
    