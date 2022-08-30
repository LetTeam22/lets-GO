import React, { useEffect } from "react";
import s from './Profile.module.css';
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material"
import image from '../../image/persona_logeada.png';
import { useDispatch } from "react-redux";
import { getUser } from "../../Redux/actions";
import { Loading } from "../Loading/Loading";
import background from '../../image/fondo_huellas.png';

export const Profile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUser = JSON.parse(localStorage.getItem('user'))
  const editedUser = JSON.parse(localStorage.getItem('userEdited'))
  
  console.log(loggedUser)
  console.log(editedUser)


  useEffect(() => {
    dispatch(getUser(JSON.parse(localStorage.getItem('user')).email))
  },[dispatch])

    return (
      !loggedUser?.hasOwnProperty('email') 
      ? <Loading/>
      : (<>
          <div className={s.container}>
            <div className={s.name}>
              { editedUser? `${editedUser.firstName} ${editedUser.lastName}` : loggedUser?.email }
            </div>
            <div className={s.infoAndImage}>
              <div className={s.information}>
                  <h4>Telefono : {editedUser?.cellphone || null}</h4>
                  <h4>Email: {loggedUser?.email}</h4>
              </div>
            <img
              src={editedUser?.profilePic || image}
              alt={editedUser?.firstName || null}
              className={s.img}
              />
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
            </div>
            <img src={background} alt='fondo' className={s.background} />
        </>)
    )
  
}
