import React from "react";
import s from "./Box.module.css"

export const Box = ({ show }) => {
    return (
        <span className={`${s.box} ${show? s.active : ''}`}>

        </span>
    )
}