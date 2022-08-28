import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { Filters } from '../Filters/Filters'
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { getBikes, getRenderedBikes } from '../../Redux/actions/'
// import { NotFound } from '../NotFound/NotFound'
import s from './Home.module.css';


export const Home = () => {

    const dispatch = useDispatch();
    const allBikes = useSelector(state => state.allBikes);
    const renderedBikes = useSelector(state => state.renderedBikes)
    const paginate = useSelector(state => state.paginate);
    const parameters = useSelector(state => state.parameters);

    useEffect(() => loadParameters(), [parameters])     // eslint-disable-line react-hooks/exhaustive-deps

    const loadParameters = () => {
        dispatch(getRenderedBikes(parameters))
    }

    // info desde back en primer renderizado
    if (!allBikes.length) dispatch(getBikes());

    // defino loading 
    let loading = false;
    if (!allBikes.length) loading = true;

    // paginado
    const indexLastBike = paginate.currentPage * paginate.bikesPerPage;
    const indexFirstBike = indexLastBike - paginate.bikesPerPage;
    const currentBikes = renderedBikes.slice(indexFirstBike, indexLastBike);

    return (
        <div className={s.container}>
            {loading && <Loading />}
            <div className={s.encabezado}></div>
            <div className={s.filterwrapp}>
                <Filters />
            </div>
            <div>
                {renderedBikes.length && <Pagination />}
            </div>
            {!loading && !!renderedBikes.length &&
                <div>
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
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            }
            <div style={{display:"block", border:"2px solid blue", height:"30rem"}}>
                <h1>ACCESORIOS</h1>
            </div>
        </div>

    )
};