import React from 'react'
import s from './FiltersSelected.module.css';


export const FiltersSelected = ({select, handleDelete}) => {

    return (
        <>
            { !!select.length && select.map((f, i) => (
                <button
                    key={i}
                    onClick={e => handleDelete(e, f, i)} 
                    className={s.deleteBtn}> &#10060; {f} 
                </button>
            ))}
        </>
    )
};