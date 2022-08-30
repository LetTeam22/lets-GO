import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import s from './Orderings.module.css';

const Orderings = ({handleChangeIdCard}) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);

    const handleSort = (property, value) => {
        let newSorts = parameters.sorts.selected.filter(p => p !== property)
        if (value !== '') newSorts = [...newSorts, property]
        let newSortsValues = {...parameters}
        newSortsValues.sorts.selected = newSorts
        newSortsValues.sorts[property] = value
        dispatch(setParameters(newSortsValues))
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
}

    const handlePriceSort = e => {
        handleSort('price', e.target.value)
    }

    const handleRatingSort = e => {
        handleSort('rating', e.target.value)
    }

    const handleNameSort = e => {
        handleSort('name', e.target.value)
    }

    return (
        <div className={s.container} >
            <span className={s.spanOrderings}>Ordenar por precio:</span>
            <select value='price' onChange={handlePriceSort} className={s.orderings}>
                <option value=''></option>
                <option value='asc'>menor precio</option>
                <option value='desc'>mayor precio</option>
            </select>

            <span className={s.spanOrderings}>Ordenar por Rating:</span>
            <select value='rating' onChange={handleRatingSort} className={s.orderings}>
                <option value=''></option>
                <option value='asc'>menor raiting</option>
                <option value='desc'>mayor raiting</option>
            </select>

            <span className={s.spanOrderings}>Ordenar por nombre:</span>
            <select value='name' onChange={handleNameSort} className={s.orderings}>
                <option value=''></option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
        </div>    
    )

}

export default Orderings;