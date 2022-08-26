import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading'
// import { NotFound } from '../NotFound/NotFound'
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { getBikes } from '../../Redux/actions/'
// import s from './Home.module.css';





export const Home = () => {

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);
    let allBikes =  useSelector(state => state.allBikes);
    // const searchBike = useSelector(state => state.searchBike);
    // const bikeByTipe = useSelector(state => state.bikeByTipe)
    
    // paginado
    const bikesPerPage = 9;
    const indexLastBike = currentPage * bikesPerPage;
    const indexFirstBike = indexLastBike - bikesPerPage;
    const currentBike = allBikes.slice(indexFirstBike, indexLastBike);
    
   // info desde back en primer renderizado
    if(!allBikes.length) {
        dispatch(getBikes());
    }

    // defino loading 
    let loading = false;
    if(!allBikes.length) loading = true;

    return (
        <div > 
            { loading && <Loading /> }
            {!loading && !!currentBike.length && 
            <div>              
                {currentBike?.map(e => (
                <div key={e.idBike} >
                    <Link to={'/bike/' + e.idBike }>
                        <Card
                            key= {e.idBike}
                            name={e.name}
                            type={e.type}
                            image={e.image}
                            traction={e.traction}
                            wheelSize={e.wheelSize}
                            price= {e.price}
                            rating= {e.rating}
                        />
                    </Link>
                </div>                           
                ))}
            </div>        
            }
            <div>
                { allBikes.length && <Pagination allBikes = {allBikes.length} bikesPerPage = {bikesPerPage} />}
            </div>
        </div>

    )
};