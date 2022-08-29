import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './Profile.module.css';
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material"
import image from '../../image/persona_logeada.png';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/actions";
import { useState } from "react";
import { Loading } from "../Loading/Loading";

export const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useAuth0();
  const loggedUser = useSelector(state => state.user)
  const history = useHistory();
  const [renderUser, setRenderUser] = useState({})
  useEffect(() => {
    dispatch(getUser(user?.email))
    setRenderUser(user?.email)
  },[])
  if (!renderUser) return <Loading/>
  else {
    console.log(renderUser)
    return (
      <>
      <div className={s.container}>
        <div className={s.nameAndImg}>
          <h2>{`${loggedUser.firstName || null } ${loggedUser.lastName || null}`}</h2>
            <img
              src={loggedUser.profilePic ? loggedUser.profilePic : image}
              alt={loggedUser.firstName || null}
              className={s.img}
            />
        </div>
        <div>
            <h4>Telefono : {loggedUser.cellphone || null}</h4>
            <h4>Email: {loggedUser.email}</h4>
        </div>
      </div>
      <Button
        variant="contained"
        color="success"
        className={s.btnHome}
        onClick={() => history.push("/home")}
      >
        Go Home
      </Button>
      <Button
        variant="contained"
        color="success"
        className={s.btnEdit}
        onClick={() => history.push("/editProfile")}
      >
        Editar Perfil
      </Button>
    </>)
  }
}
