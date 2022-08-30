import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import  Filters  from '../Filters/Filters'
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import Dates from '../Dates/Dates';
import { getBikes, getRenderedBikes } from '../../Redux/actions/'
import { NotFound } from '../NotFound/NotFound'
import s from './Home.module.css';
import encabezado from '../../image/encabezado.png';
import Orderings from '../Orderings/Orderings';
// import huellas from '../../image/Group.png';
// import ruedas from '../../image/Group.png';
// import FiltersSelected from '../FiltersSelected/FiltersSelected';


export const Home = () => {

    const dispatch = useDispatch();
    const allBikes = useSelector(state => state.allBikes);
    const renderedBikes = useSelector(state => state.renderedBikes)
    const paginate = useSelector(state => state.paginate);
    const parameters = useSelector(state => state.parameters);
    // const allSelectedFilters = useSelector(state => state.selectedFilters);
    let [ cardId, setCardId ] = useState(1);

    useEffect(() => loadParameters(), [parameters])     // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeIdCard = () => {
        setCardId(1);
    }
    
    const loadParameters = () => {
        dispatch(getRenderedBikes(parameters))
    }

    // info desde back en primer renderizado
    if (!allBikes.length) dispatch(getBikes());

    // defino loading 
    let loading = false;
    if (!allBikes.length) loading = true;

    // defino notFound
    let notFound = false;
    if (!renderedBikes.length) notFound = true;

    // paginado
    const indexLastBike = paginate.currentPage * paginate.bikesPerPage;
    const indexFirstBike = indexLastBike - paginate.bikesPerPage;
    const currentBikes = renderedBikes.slice(indexFirstBike, indexLastBike);

    return (
        <div className={s.containerHome}>
            <div className={s.encabezado}>
                <img src={encabezado} alt="encabezado" className={s.encabezado} />
            </div>
            <h3 className={s.title}>ENCONTRÁ TU LET</h3>
            <Orderings handleChangeIdCard={handleChangeIdCard} />
            <Dates />
            <span className={s.result} >{`Resultados encontrados: ${renderedBikes.length}`}</span>
            <div className={s.filterwrapp}>              
                <Filters handleChangeIdCard={handleChangeIdCard} />
            </div>
            { renderedBikes.length && <Pagination /> }
            { notFound && <NotFound /> }
            { loading && <Loading /> }
            { !loading && !!renderedBikes.length &&
                <div className={s.containerCards}>
                    {currentBikes?.map(e => (
                        <div key={e.idBike} >
                            <Link to={'/bike/' + e.idBike}>
                                <Card
                                    key={e.idBike}
                                    name={e.name}
                                    type={e.type}
                                    image={e.image}
                                    traction={e.traction}
                                    wheelSize={e.wheelSize}
                                    price={e.price}
                                    rating={e.rating}
                                    color={e.color}
                                    id={cardId++}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            }              
        </div>
    )
};

{/* <img src={ruedas} alt="ruedas" className={s.ruedas} />
<h2 className={s.titleAccs}>ACCESORIOS</h2> */}              