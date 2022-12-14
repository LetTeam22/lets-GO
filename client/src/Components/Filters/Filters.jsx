import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import s from './Filters.module.css';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from '@mui/material';
import { GiElectric } from 'react-icons/gi';
import { GoGear } from 'react-icons/go';
import { finalPrice } from '../../helpers/applyDiscount';

const Filters = ({ handleParameter }) => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);
    const allBikes = useSelector((state) => state.allBikes);
    let renderedBikes = useSelector((state) => state.renderedBikes);
    const bookings = JSON.parse(localStorage.getItem("booking")) || [];

    // calculo precio real minimo y maximo para el slider (con descuentos aplicados)
    const activeBikes = allBikes.length ? allBikes.filter(b => b.status === 'active') : ''
    const finalPrices = activeBikes.length ? activeBikes.map(b => finalPrice(b.price, b.discount)) : ''
    const realMinPrice = finalPrices.length ? Math.min(...finalPrices) : 0
    const realMaxPrice = finalPrices.length ? Math.max(...finalPrices) : 2000

    // filtro bicis ya agregadas al carrito
    renderedBikes = renderedBikes.filter(rb => !bookings.find(bk => bk.bike === rb.idBike))

    const handlePrice = (e, newRange) => {
        e.preventDefault()
        let minPrice = newRange[0] === realMinPrice ? '' : newRange[0]
        let maxPrice = newRange[1] === realMaxPrice ? '' : newRange[1]
        handleParameter(e, 'min', minPrice, 'Precio Min', '', 'filters')
        handleParameter(e, 'max', maxPrice, 'Precio Max', '', 'filters')
    };

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

    const handleTypeFilter = e => {
        handleParameter(e, 'type', e.target.value, 'Tipo', '', 'filters')
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

            <span className={s.spanFilters}>Precio</span>
            <Slider
                value={[parameters.filters.price.min ? parameters.filters.price.min : realMinPrice, parameters.filters.price.max ? parameters.filters.price.max : realMaxPrice]}
                min={realMinPrice}
                max={realMaxPrice}
                step={10}
                onChange={handlePrice}
                valueLabelDisplay="auto"
                sx={{color: 'orange', width: '90%', marginLeft: 'auto', marginRight: 'auto'}}
            />

            <span className={s.spanFilters}>Tracción (mecánica/eléctrica)</span>
            <div className={s.tractionCont}>
                <button 
                    onClick={handleTractionMecFilter} 
                    className={parameters.filters.traction === 'mecánica' ? `${s.iconBtn} ${s.act}` : s.iconBtn}
                ><GoGear size='2.2rem' className={s.icon} /></button>
                <button 
                    onClick={handleTractionElecFilter} 
                    className={parameters.filters.traction === 'eléctrica' ? `${s.iconBtn} ${s.act}` : s.iconBtn}
                ><GiElectric size='2.2rem' className={s.icon} /></button>
            </div>

            <div className='checkCont'>

                <FormControl >
                    <FormLabel >Rodado</FormLabel>
                    <RadioGroup value={parameters.filters.wheelSize} onChange={handleWheelSizeFilter}>
                        <FormControlLabel value="" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}}/>} label="Todos"/>
                        <FormControlLabel value="16" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15},'&.Mui-checked': {color: 'black'}}} />}  label="16"/>
                        <FormControlLabel value="20" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15},'&.Mui-checked': {color: 'black'}}}/>} label="20"/>
                        <FormControlLabel value="24" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15},'&.Mui-checked': {color: 'black'}}}/>} label="24"/>
                        <FormControlLabel value="26" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15},'&.Mui-checked': {color: 'black'}}}/>} label="26"/>
                        <FormControlLabel value="29" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15},'&.Mui-checked': {color: 'black'}}}/>} label="29"/>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Color</FormLabel>
                    <RadioGroup value={parameters.filters.color} onChange={handleColorFilter}>
                        <FormControlLabel value="" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small" />}  label="Todos" />
                        <FormControlLabel value="negro" control={<Radio size="small"  sx={{color: 'black','&.Mui-checked': {color: 'black',},'& .MuiSvgIcon-root': {fontSize: 15},}}/>} />
                        <FormControlLabel value="gris" control={<Radio size="small" sx={{color: 'gray','&.Mui-checked': {color: 'gray',},'& .MuiSvgIcon-root': {fontSize: 15}}}/>} />
                        <FormControlLabel value="blanco" control={<Radio size="small" sx={{color: 'white','&.Mui-checked': {color: 'white',},'& .MuiSvgIcon-root': {fontSize: 15}}}/>} />
                        <FormControlLabel value="rojo" control={<Radio size="small" sx={{color: 'red','&.Mui-checked': {color: 'red',},'& .MuiSvgIcon-root': {fontSize: 15}}}/>} />
                        <FormControlLabel value="amarillo" control={<Radio size="small" sx={{color: 'yellow','&.Mui-checked': {color: 'yellow',},'& .MuiSvgIcon-root': {fontSize: 15}}}/>} />
                        <FormControlLabel value="azul" control={<Radio size="small" sx={{color: 'blue','&.Mui-checked': {color: 'blue',},'& .MuiSvgIcon-root': {fontSize: 15}}}/>} />
                        <FormControlLabel value="verde" control={<Radio size="small" sx={{color: 'green','&.Mui-checked': {color: 'green',},'& .MuiSvgIcon-root': {fontSize: 15}}}/>} />
                    </RadioGroup>
                </FormControl>

                <FormControl >
                    <FormLabel>Tipo</FormLabel>
                    <RadioGroup value={parameters.filters.type} onChange={handleTypeFilter}>
                        <FormControlLabel value="" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="Todos"/>
                        <FormControlLabel value="bmx" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="bmx"/>
                        <FormControlLabel value="city" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="city"/>
                        <FormControlLabel value="mtb" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="mtb"/>
                        <FormControlLabel value="tandem" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="tandem"/>
                        <FormControlLabel value="touring" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="touring"/>
                        <FormControlLabel value="folding" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 15}, '&.Mui-checked': {color: 'black'}}} size="small"/>} label="folding"/>
                    </RadioGroup>
                </FormControl>

            </div>
        
        </div>
    )
};

export default Filters;