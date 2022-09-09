import React from "react";
import s from './Loading.module.css';
// import rueda from "../../image/rueda_bici.png";

export default function Loading () {
    const rueda = "https://res.cloudinary.com/pflet/image/upload/v1662686110/Let/image/rueda_bici_kouezn.png"
    return (
        <div className={s.spinner}>
            <div className={s.seMueve}>
                <img src={rueda} alt="Loading..." className={s.gira} />
            </div>
        </div>
    )
};