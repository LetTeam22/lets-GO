import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import s from './Filters.module.css';
import { useState } from "react";
import { FiltersSelected } from "../FiltersSelected/FiltersSelected";

const Filters = ({ handleChangeIdCard }) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const [ select, setSelect ] = useState([]);
    const [ selectProp, setpropSelect ] = useState([]);
    // const [ selectPrice, setSelectPrice] = useState([])
    

    const handleSelect = (e, type) => {
        e.preventDefault();
        setSelect([...select, type]);
    }

    // const handleSelectPrice = (e, value) => {
    //     e.preventDefault();
    //     setSelect([value]);
    // }

    const handleSelectProp = (e, type) => {
        e.preventDefault();
        setpropSelect([...selectProp, type]);
    }

    const handleTypeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, type: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
        handleSelectProp(e, e.target.name);
    };

    const handleTractionFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, traction: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
        handleSelectProp(e, e.target.name);
    };

    const handleWheelSizeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, wheelSize: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
        handleSelectProp(e, e.target.name);
    };

    const handleColorFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, color: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        handleSelect(e, e.target.value);
        handleSelectProp(e, e.target.name);
    };

    const handleMinPriceFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, price: {...parameters.filters.price, min: e.target.value}}})); 
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        // handleSelectPrice(e, e.target.value);
        const nameMinPrice = selectProp.find(n => n === e.target.name);
        if(!nameMinPrice) handleSelectProp(e, e.target.name);
    };

    const handleMaxPriceFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, price: {...parameters.filters.price, max: e.target.value}}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
        // handleSelectPrice(e, e.target.value);
        const nameMaxPrice = selectProp.find(n => n === e.target.name);
        if(!nameMaxPrice) handleSelectProp(e, e.target.name);
    };
    
    const handleDelete = (e, type, i) => {
        e.preventDefault();
        const filterSelect = select.filter(s => s !== type);
        const propSelect = selectProp.filter(p => p !== selectProp[i]);
        setSelect(filterSelect);
        setpropSelect(propSelect)
        // setSelectPrice([])
        if(selectProp[i] === 'wheelSize') dispatch(setParameters({...parameters, filters: {...parameters.filters, wheelSize: ''}}));
        if(selectProp[i] === 'color') dispatch(setParameters({...parameters, filters: {...parameters.filters, color: ''}}));
        if(selectProp[i] === 'minPrice') dispatch(setParameters({...parameters, filters: {...parameters.filters.price, min:''}}));
        if(selectProp[i] === 'maxPrice') dispatch(setParameters({...parameters, filters: {...parameters.filters.price, max:''}}));
        if(selectProp[i] === 'traction') dispatch(setParameters({...parameters, filters: {...parameters.filters, traction: ''}}));
        if(selectProp[i] === 'type') dispatch(setParameters({...parameters, filters: {...parameters.filters, type: ''}}));
    };

    const handleResetAll = e => {
        e.preventDefault();
        dispatch(setParameters('resetAll'));
        dispatch(setCurrentPage(1));
    };

    return (
        <>       
            <button className={s.reset} onClick={handleResetAll}>Resetear Filtros</button> 
            <h4 className={s.title}>Filtros</h4>

            <span className={s.spanFilters}>Rodado</span>
            <select name='wheelSize' onChange={handleWheelSizeFilter} className={s.select}>
                <option value=''></option>
                <option value='16'>16</option>
                <option value='20'>20</option>
                <option value='24'>24</option>
                <option value='26'>26</option>
                <option value='29'>28</option>
            </select>

            <span className={s.spanFilters}>Color</span>
            <select name='color' onChange={handleColorFilter} className={s.select}>
                <option value=''></option>
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
                    name= 'minPrice'
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
                    name='maxPrice'
                    value={parameters.filters.price.max} 
                    onChange={handleMaxPriceFilter} 
                    className={s.priceInputs}
                />
            </div>

            <span className={s.spanFilters}>Tracción</span>
            <select name='traction' onChange={handleTractionFilter} className={s.select}>
                <option value=''></option>
                <option value='mecánica'>mecánica</option>
                <option value='eléctrica'>eléctrica</option>
            </select>

            <span className={s.spanFilters}>Tipos</span>
            <select name='types' onChange={handleTypeFilter} className={s.select} >
                <option value=''></option>
                <option value='bmx'>bmx</option>
                <option value='city'>city</option>
                <option value='mtb'>mtb</option>
                <option value='tandem'>tandem</option>
                <option value='touring'>touring</option>
                <option value='folding'>folding</option>
            </select>
            <span className={s.fil} >Tus filtros:</span>
            <FiltersSelected select={select} handleDelete = {handleDelete} />
         </>
    )
};

export default Filters;