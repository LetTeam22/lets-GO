import React from 'react'
import s from './FiltersSelected.module.css';


export const FiltersSelected = ({label, select, handleDelete}) => {

    return (
        <>
            <div className={s.selContainer}>
                <span>{label}</span> 
                {
                    select.selected.map((p, i) => (
                        <button
                            key={i}
                            onClick={p === 'search' ? e => handleDelete(e) : e => handleDelete(e, p, select.labels[i], select.ids[i])} 
                            className={s.deleteBtn}> &#10060; {p === 'search' ? select[p] : `${select.labels[i]}: ${p === 'min' || p === 'max' ? select.price[p] : select[p]}`} 
                        </button>
                    ))
                }
            </div>
        </>
    )
};