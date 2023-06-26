import React from "react";
import s from './Loading.module.css';
// import rueda from "../../image/rueda_bici.png";

export default function Loading () {
    const rueda = "https://res.cloudinary.com/pflet/image/upload/v1662686110/Let/image/rueda_bici_kouezn.png"
    return (
        <div className={s.contain}>
            <span className={s.span}>
            Esta aplicación está alojada en un hosting gratuito... los tiempos de carga son un poco más lentos.
            <br />
            Te invitamos a esperar unos segundos más para descubrir el funcionamiento del sitio...
            </span>
            <div>
                <div className={s.spinner}>
                    <div className={s.seMueve}>
                        <img src={rueda} alt="Loading..." className={s.gira} />
                    </div>
                </div>
            </div>
        </div>
    )
};