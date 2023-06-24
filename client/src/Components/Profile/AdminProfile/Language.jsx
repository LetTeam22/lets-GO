import React from "react";
import s from './Summary.module.css'
import { MdLanguage } from 'react-icons/md'

export const Language = ({ params, showFcn }) => {
    const { language, message } = params.row
    if(language === 'Español') return <span>{language}</span>
    const handleClick = () => {
        showFcn(message)
    }
    return (
        <div onClick={handleClick} className={`${s.container} ${s.toClick}`}>
            <span>{language}</span>
            <MdLanguage/>
        </div>
    )
}