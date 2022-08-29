import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import s from './Filters.module.css';
import { useState } from "react";
import FiltersSelected from "../FiltersSelected/FiltersSelected";

const Filters = ({handleChangeIdCard}) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const [ select, setSelect ] = useState([]);
    

    const handleSelect = (e, type) => {
        e.preventDefault();
        setSelect([...select, type]);
    }

    const handleDelete = (e, type) => {
        e.preventDefault();
        let filterSelect = select.filter(s => s !== type);
        setSelect(filterSelect);
    }

    const handleTypeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, type: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
    };

    const handleTractionFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, traction: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
    };

    const handleWheelSizeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, wheelSize: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
    };

    const handleColorFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, color: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
    };

    const handleMinPriceFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, price: {...parameters.filters.price, min: e.target.value}}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    const handleMaxPriceFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, price: {...parameters.filters.price, max: e.target.value}}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    return (
        <>
            <FiltersSelected select={select} handleDelete={handleDelete} />

            <h4 className={s.title}>Filtros</h4>

            <span className={s.spanFilters}>Tamaño rueda</span>
            <select value='wheelSize' onChange={handleWheelSizeFilter} className={s.select}>
                <option value=''>todas</option>
                <option value='16'>16</option>
                <option value='20'>20</option>
                <option value='24'>24</option>
                <option value='26'>26</option>
                <option value='29'>28</option>
            </select>

            

            <span className={s.spanFilters}>Color</span>
            <select value='color' onChange={handleColorFilter} className={s.select}>
                <option value=''>todas</option>
                <option value='negro'>negro</option>
                <option value='gris'>gris</option>
                <option value='blanco'>blanco</option>
                <option value='rojo'>rojo</option>
                <option value='amarillo'>amarillo</option>
                <option value='azul'>azul</option>
                <option value='verde'>verde</option>
            </select>

        
            <span className={s.spanFilters}>Precio Mínimo</span>
            <div className={s.input}>
                <FaRegMoneyBillAlt color="#C3C4C5" size='2rem' className={s.priceIcon} />
                <input 
                    type='number' 
                    value={parameters.filters.price.min} 
                    onChange={handleMinPriceFilter} 
                    className={s.priceInputs}
                />
            </div>
            
           
            <span className={s.spanFilters}>Precio Máximo</span>
            <div className={s.input}>
                <FaRegMoneyBillAlt color="#C3C4C5" size='2rem' className={s.priceIcon} />
                <input 
                    type='number' 
                    value={parameters.filters.price.max} 
                    onChange={handleMaxPriceFilter} 
                    className={s.priceInputs}
                />
            </div>
            

            <span className={s.spanFilters}>Tracción</span>
            <select value='traction' onChange={handleTractionFilter} className={s.select}>
                <option value=''>todas</option>
                <option value='mecánica'>mecánica</option>
                <option value='eléctrica'>eléctrica</option>
            </select>


            <span className={s.spanFilters}>Tipos</span>
            <select value='types' onChange={handleTypeFilter} className={s.select} >
                <option value=''>todos</option>
                <option value='bmx'>bmx</option>
                <option value='city'>city</option>
                <option value='mtb'>mtb</option>
                <option value='tandem'>tandem</option>
                <option value='touring'>touring</option>
                <option value='folding'>folding</option>
            </select>
        </>
    )
};

export default Filters;