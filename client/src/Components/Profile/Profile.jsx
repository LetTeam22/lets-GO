import React, { useEffect } from "react";
import s from './Profile.module.css';
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material"
import image from '../../image/persona_logeada.png';
import { useDispatch } from "react-redux";
import { getUser } from "../../Redux/actions";
import { Loading } from "../Loading/Loading";

export const Profile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUser = JSON.parse(localStorage.getItem('user'))
 


  useEffect(() => {
    dispatch(getUser(JSON.parse(localStorage.getItem('user')).email))
  },[])

    return (
      !loggedUser?.hasOwnProperty('email') 
      ? <Loading/>
      : (<>
          <div className={s.container}>
            <div className={s.nameAndImg}>
              <h2>{`${loggedUser?.firstName || null } ${loggedUser?.lastName || null}`}</h2>
                <img
                  src={loggedUser?.profilePic ? loggedUser.profilePic : image}
                  alt={loggedUser?.firstName || null}
                  className={s.img}
                />
            </div>
            <div>
                <h4>Telefono : {loggedUser?.cellphone || null}</h4>
                <h4>Email: {loggedUser?.email}</h4>
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
    )
  
}
