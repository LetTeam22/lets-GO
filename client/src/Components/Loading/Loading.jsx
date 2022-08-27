import React from "react";
import s from './Loading.module.css';
import rueda from "../../image/rueda_bici.png";

export const Loading = () => {

    return (
        <div className={s.spinner}>
            <img src={rueda} alt="Loading..." className={s.spinnerImg} />
        </div>
    )
};

