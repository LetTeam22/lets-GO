import React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router';
import { Link, useParams } from 'react-router-dom'
import { getBikeDetail } from '../../Redux/actions';
import { Loading } from '../Loading/Loading';


export const BikeDetail = () => {

    const dispatch = useDispatch()
    const bike = useSelector((state) => state.bikeDetail)
    const { bikeId } = useParams()
    // const history = useHistory()

    useEffect(() => {
        dispatch(getBikeDetail(bikeId))
        //     dispatch(resetState()) /// ¿creo una action?
    }, [dispatch, bikeId])

    return (
        <>
            { !!bike.length ? <Loading /> :
                <div>
                    <img src={bike.image} alt='img not found' />
                    <div>
                        <h3>{bike.name}</h3>
                        <h4>{bike.type} </h4>
                        <h4>{bike.traction}</h4>
                        <p>${bike.price}</p>
                        <p>Rodado {bike.wheelSize}</p>
                        <p>{bike.rating}/10</p>
                    </div>
                    <Link to='/cart'>
                        <button > Reservar </button>
                    </Link>

                    <div>
                        <label>Accesorios</label>
                        <div>
                            <label>Canasto</label>
                            <input type='checkbox' />

                            <label>Silla porta bebes</label>
                            <input type='checkbox' />

                            <label>Luces</label>
                            <input type='checkbox' />

                            <label>Casco</label>
                            <input type='checkbox' />

                            <label>Candado</label>
                            <input type='checkbox' />

                            <label>Portacelular</label>
                            <input type='checkbox' />

                            <label>Lentes</label>
                            <input type='checkbox' />

                            <label>Botella</label>
                            <input type='checkbox' />

                            <label>Calzado</label>
                            <input type='checkbox' />
                        </div>

                    </div>

                </div>
                    
            }
        </>
    )
};