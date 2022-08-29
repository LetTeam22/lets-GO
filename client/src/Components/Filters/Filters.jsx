import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import s from './Filters.module.css';

const Filters = ({handleChangeIdCard}) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);

    const handleTypeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, type: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard(); 
    };

    const handleTractionFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, traction: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    const handleWheelSizeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, wheelSize: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
    };

    const handleColorFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, color: e.target.value}}));    
        dispatch(setCurrentPage(1));
        handleChangeIdCard();
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
                <option value='black'>black</option>
                <option value='grey'>grey</option>
                <option value='white'>white</option>
                <option value='red'>red</option>
                <option value='yellow'>yellow</option>
                <option value='blue'>blue</option>
                <option value='green'>green</option>
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
                <option value='mechanic'>mechanic</option>
                <option value='electric'>electric</option>
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