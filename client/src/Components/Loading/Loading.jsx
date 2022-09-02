import React from "react";
import s from './Loading.module.css';
import rueda from "../../image/rueda_bici.png";

export default function Loading () {
    return (
        <div className={s.spinner}>
            <div className={s.seMueve}>
                <img src={rueda} alt="Loading..." className={s.gira} />
            </div>
        </div>
    )
};