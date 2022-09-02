import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import s from './Filters.module.css';
import gear from '../../image/gear.png'
import ray from '../../image/ray.png'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const Filters = ({ handleParameter }) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const renderedBikes = useSelector((state) => state.renderedBikes);

    const handleTypeFilter = e => {
        handleParameter(e, 'type', e.target.value, 'Tipo', '', 'filters')
    }

    const handleTractionMecFilter = e => {
        handleParameter(e, 'traction', 'mecánica', 'Tracción', '', 'filters')
    }

    const handleTractionElecFilter = e => {
        handleParameter(e, 'traction', 'eléctrica', 'Tracción', '', 'filters')
    }

    const handleWheelSizeFilter = e => {
        handleParameter(e, 'wheelSize', e.target.value, 'Rodado', '', 'filters')
    }

    const handleColorFilter = e => {
        handleParameter(e, 'color', e.target.value, 'Color', '', 'filters')
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
            <div className='checkCont'>

                <FormControl>
                    <FormLabel>Rodado</FormLabel>
                    <RadioGroup value={parameters.filters.wheelSize} onChange={handleWheelSizeFilter}>
                        <FormControlLabel value="" control={<Radio />} label="Todos"/>
                        <FormControlLabel value="16" control={<Radio />} label="16"/>
                        <FormControlLabel value="20" control={<Radio />} label="20"/>
                        <FormControlLabel value="24" control={<Radio />} label="24"/>
                        <FormControlLabel value="26" control={<Radio />} label="26"/>
                        <FormControlLabel value="29" control={<Radio />} label="29"/>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Color</FormLabel>
                    <RadioGroup value={parameters.filters.color} onChange={handleColorFilter}>
                        <FormControlLabel value="" control={<Radio />} />
                        <FormControlLabel value="negro" control={<Radio sx={{color: 'black','&.Mui-checked': {color: 'black',},}}/>} />
                        <FormControlLabel value="gris" control={<Radio sx={{color: 'gray','&.Mui-checked': {color: 'gray',},}}/>} />
                        <FormControlLabel value="blanco" control={<Radio sx={{color: 'white','&.Mui-checked': {color: 'white',},}}/>} />
                        <FormControlLabel value="rojo" control={<Radio sx={{color: 'red','&.Mui-checked': {color: 'red',},}}/>} />
                        <FormControlLabel value="amarillo" control={<Radio sx={{color: 'yellow','&.Mui-checked': {color: 'yellow',},}}/>} />
                        <FormControlLabel value="azul" control={<Radio sx={{color: 'blue','&.Mui-checked': {color: 'blue',},}}/>} />
                        <FormControlLabel value="verde" control={<Radio sx={{color: 'green','&.Mui-checked': {color: 'green',},}}/>} />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Tipo</FormLabel>
                    <RadioGroup value={parameters.filters.type} onChange={handleTypeFilter}>
                        <FormControlLabel value="" control={<Radio />} label="Todos"/>
                        <FormControlLabel value="bmx" control={<Radio />} label="bmx"/>
                        <FormControlLabel value="city" control={<Radio />} label="city"/>
                        <FormControlLabel value="mtb" control={<Radio />} label="mtb"/>
                        <FormControlLabel value="tandem" control={<Radio />} label="tandem"/>
                        <FormControlLabel value="touring" control={<Radio />} label="touring"/>
                        <FormControlLabel value="folding" control={<Radio />} label="folding"/>
                    </RadioGroup>
                </FormControl>

            </div>
        
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
            
            <span className={s.spanFilters}>Tracción (mecánica/eléctrica)</span>
            <div className={s.tractionCont}>
                <img className={parameters.filters.traction === 'mecánica' ? `${s.mecanica} ${s.act}` : s.mecanica} src={gear} alt='Mecánica ' onClick={handleTractionMecFilter}/>
                <img className={parameters.filters.traction === 'eléctrica' ? `${s.electrica} ${s.act}` : s.electrica} src={ray} alt='Eléctrica ' onClick={handleTractionElecFilter}/>
            </div>
            
        </div>
    )
};

export default Filters;