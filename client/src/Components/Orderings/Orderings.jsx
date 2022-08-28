import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import s from './Orderings.module.css';

const Orderings = ({handleChangeIdCard}) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);

    const handlePriceSort = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, sorts: {...parameters.sorts, price: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    const handleRatingSort = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, sorts: {...parameters.sorts, rating: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    const handleNameSort = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, sorts: {...parameters.sorts, name: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    return (
        <div className={s.container} >
            <span className={s.spanOrderings}>Ordenar por precio:</span>
            <select value='price' onChange={handlePriceSort} className={s.orderings}>
                <option value=''></option>
                <option value='asc'>asc</option>
                <option value='desc'>desc</option>
            </select>

            <span className={s.spanOrderings}>Ordenar por Rating:</span>
            <select value='rating' onChange={handleRatingSort} className={s.orderings}>
                <option value=''></option>
                <option value='asc'>asc</option>
                <option value='desc'>desc</option>
            </select>

            <span className={s.spanOrderings}>Ordenar por nombre:</span>
            <select value='name' onChange={handleNameSort} className={s.orderings}>
                <option value=''></option>
                <option value='asc'>asc</option>
                <option value='desc'>desc</option>
            </select>
        </div>    
    )

}

export default Orderings;