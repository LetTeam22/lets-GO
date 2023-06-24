import React from "react"
import s from './ModalContact.module.css';

export const ModalContact = ({ message }) => {

    return (
        <div className={s.container}>
            <p className={s.title}>Mensaje</p>
            <p>{message}</p>
        </div>
    )
}