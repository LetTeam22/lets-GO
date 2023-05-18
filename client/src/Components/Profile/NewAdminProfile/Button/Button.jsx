import React from "react";
import s from './Button.module.css';


export const Button = ({children, onClick, active, childrens, table, value}) => {
    // la idea de pasarle en childrens si hay arreglo con subgrupos
    return (
        <button onClick={()=>onClick(table, value)} className={active === value? `${s.button} ${s.active}` : s.button}>
            {children}
        </button>
    )
}