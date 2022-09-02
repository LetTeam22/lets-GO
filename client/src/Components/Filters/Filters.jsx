import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import s from './Filters.module.css';

const Filters = ({ handleParameter }) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const renderedBikes = useSelector((state) => state.renderedBikes);

    const handleTypeFilter = e => {
        handleParameter(e, 'type', e.target.value, 'Tipo', 'typeFilter', 'filters')
    }

    const handleTractionFilter = e => {
        handleParameter(e, 'traction', e.target.value, 'Tracción', 'tractionFilter', 'filters')
    }

    const handleWheelSizeFilter = e => {
        handleParameter(e, 'wheelSize', e.target.value, 'Rodado', 'wheelSizeFilter', 'filters')
    }

    const handleColorFilter = e => {
        handleParameter(e, 'color', e.target.value, 'Color', 'colorFilter', 'filters')
    }

    const handleMinPriceFilter = e => {
        handleParameter(e, 'min', e.target.value, 'Precio Min', 'minPriceFilter', 'filters')
    }

    const handleMaxPriceFilter = e => {
        handleParameter(e, 'max', e.target.value, 'Precio Max', 'maxPriceFilter', 'filters')
    }

    const handleResetAll = e => {
        e.preventDefault();
        parameters.filters.ids.forEach(id => {
            document.getElementById(id).value = ''
        });
        parameters.sorts.ids.forEach(id => {
            document.getElementById(id).value = ''
        });
        dispatch(setParameters('resetAll'));
        dispatch(setCurrentPage(1));
    };

    return (     
        <div className={s.filtersSticky}>
            <h3 className={s.title}>ENCONTRÁ TU LET</h3>
            <span className={s.result} >{`Resultados encontrados: ${renderedBikes.length}`}</span>
            <button className={s.reset} onClick={handleResetAll}>Borrar filtros</button>
            {/* <h4 className={s.titleFilters}>Filtros</h4> */}
            <span className={s.spanFilters}>Rodado</span>
            <select name='wheelSize' onChange={handleWheelSizeFilter} className={parameters.filters.wheelSize ? `${s.select} ${s.act}` : s.select} id='wheelSizeFilter'>
                <option value=''></option>
                <option value='16'>16</option>
                <option value='20'>20</option>
                <option value='24'>24</option>
                <option value='26'>26</option>
                <option value='29'>29</option>
            </select>

            <span className={s.spanFilters}>Color</span>
            <select name='color' onChange={handleColorFilter} className={parameters.filters.color ? `${s.select} ${s.act}` : s.select} id='colorFilter'>
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
            <div className={parameters.filters.price.min ? `${s.input} ${s.act}` : s.input}>
                <FaRegMoneyBillAlt color="#C3C4C5" size='2rem' className={s.priceIcon} />
                <input 
                    type='number' 
                    name= 'minPrice'
                    min='0'
                    value={parameters.filters.price.min}
                    onChange={handleMinPriceFilter} 
                    className={s.priceInputs}
                    id='minPriceFilter'
                />
            </div>           
           
            <span className={s.spanFilters}>Precio Máximo</span>
            <div className={parameters.filters.price.max ? `${s.input} ${s.act}` : s.input}>
                <FaRegMoneyBillAlt color="#C3C4C5" size='2rem' className={s.priceIcon} />
                <input 
                    type='number'
                    name='maxPrice'
                    min='0'
                    value={parameters.filters.price.max} 
                    onChange={handleMaxPriceFilter} 
                    className={s.priceInputs}
                    id='maxPriceFilter'
                />
            </div>

            <span className={s.spanFilters}>Tracción</span>
            <select name='traction' onChange={handleTractionFilter} className={parameters.filters.traction ? `${s.select} ${s.act}` : s.select} id='tractionFilter'>
                <option value=''></option>
                <option value='mecánica'>mecánica</option>
                <option value='eléctrica'>eléctrica</option>
            </select>

            <span className={s.spanFilters}>Tipos</span>
            <select name='type' onChange={handleTypeFilter} className={parameters.filters.type ? `${s.select} ${s.act}` : s.select} id='typeFilter'>
                <option value=''></option>
                <option value='bmx'>bmx</option>
                <option value='city'>city</option>
                <option value='mtb'>mtb</option>
                <option value='tandem'>tandem</option>
                <option value='touring'>touring</option>
                <option value='folding'>folding</option>
            </select>
        </div>
    )
};

export default Filters;