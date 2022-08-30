import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentPage, setParameters } from "../../Redux/actions";
import s from './Orderings.module.css';
// import { FiltersSelected } from "../FiltersSelected/FiltersSelected";

const Orderings = ({handleParameter}) => {

    const handlePriceSort = e => {
        handleParameter(e, 'price', e.target.value, 'Precio', 'priceSort', 'sorts')
    }

    const handleRatingSort = e => {
        handleParameter(e, 'rating', e.target.value, 'Rating', 'ratingSort', 'sorts')
    }

    const handleNameSort = e => {
        handleParameter(e, 'name', e.target.value, 'Nombre', 'nameSort', 'sorts')
    }

    return (
        <>
            <div className={s.container} >
                <span className={s.spanOrderings}>Ordenar por precio:</span>
                <select value='price' onChange={handlePriceSort} className={s.orderings} id='priceSort'>
                    <option value=''></option>
                    <option value='asc'>menor precio</option>
                    <option value='desc'>mayor precio</option>
                </select>

                <span className={s.spanOrderings}>Ordenar por Rating:</span>
                <select value='rating' onChange={handleRatingSort} className={s.orderings} id='ratingSort'>
                    <option value=''></option>
                    <option value='asc'>menor rating</option>
                    <option value='desc'>mayor rating</option>
                </select>

                <span className={s.spanOrderings}>Ordenar por nombre:</span>
                <select value='name' onChange={handleNameSort} className={s.orderings} id='nameSort'>
                    <option value=''></option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
            </div>
        </>

    )

}

export default Orderings;