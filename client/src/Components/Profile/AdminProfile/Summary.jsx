import React from "react";
import { FaRegEye } from "react-icons/fa";
import s from './Summary.module.css';


export const Summary = ({ params, showFcn, fromContact }) => {
    const { value, id } = params
    const handleClick = () => {
        const parameter = fromContact? params.row.message : id
        showFcn(parameter)
    }
    return (
        <>
        <div className={s.container}>
            <span>
                {value}
            </span> 
            <span onClick={handleClick}>
                <FaRegEye/>
            </span>
        </div>
        </>
    )
}

