import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./Rejected.module.css";
import Loading from "../../Loading/Loading";
import swal from "sweetalert";

export default function Rejected() {
  const { logout, isLoading } = useAuth0();

  const onMove = () => {
    swal({
      title: "Lo sentimos, este usuario ha sido bloqueado.",
      text: "Para mayor informacion comuniquese con el Administrador",
      icon: "error",
      button:{
        text: 'Ok!',
        className: s.btnSwal
      }
    }).then(() => {
      logout({ returnTo: window.location.origin });
      localStorage.removeItem("url");
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className={s.background} onMouseMove={onMove}>
      </div>
    </>
  );
}
