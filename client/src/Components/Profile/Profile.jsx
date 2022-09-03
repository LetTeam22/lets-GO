import React, { useEffect } from "react";
import s from "./Profile.module.css";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import image from "../../image/persona_logeada.png";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../../Redux/actions";

export const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, user } = useAuth0();
  const userLogged = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(user?.email));
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section className={s.allPage}>
      <div className={s.container}>
        <div className={s.name}>
          {(userLogged?.firstName &&
            userLogged.firstName +
              " " +
              (userLogged?.lastName && userLogged.lastName)) ||
            userLogged?.email}
        </div>
        <div className={s.infoAndImage}>
          <div className={s.information}>
            <h4 className={s.h4}>Telefono : {userLogged?.cellphone || null}</h4>
            <h4 className={s.h4}>Email: {userLogged?.email}</h4>
          </div>
          <img
            src={userLogged?.profilePic || image}
            alt={userLogged?.firstName || null}
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
      <div className={s.background}></div>
    </section>
  );
};
