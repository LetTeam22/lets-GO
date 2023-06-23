import React from "react";
import { FaRegEye } from "react-icons/fa";
import s from './Summary.module.css';


export const Summary = ({ params, showExperience }) => {
    const { value, id } = params
    const handleClick = () => {
        showExperience(id)
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

