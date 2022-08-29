import React from 'react'
import s from './FiltersSelected.module.css';
import { MdClose } from 'react-icons/md';


const FiltersSelected = ({select, handleDelete}) => {

    return (
        <>
            {
                select.length 
                ? select.map(f => (
                    <div className={s.container}>
                        <span className={s.filterType}>{f}</span>
                        <button onClick={(e) => handleDelete(e, f)} className={s.deleteBtn} ><MdClose color='#333333' size='2rem'/></button>
                    </div>
                )) 
                : <></>
            }
        </>
    )
}

export default FiltersSelected;
