import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllContacts } from "../../../Redux/actions";
// import s from './Contacto.module.css';

export default function Contacto() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, []);

  return <div>Tabla con formulario de contacto</div>;
}
