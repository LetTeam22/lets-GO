import React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import { getBikeDetail } from '../../Redux/actions';
import { Loading } from '../Loading/Loading';
import Footer from '../Footer/Footer.jsx'




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
        < >
            {/* <h1> Estas en Bike Detail</h1> */}
            {/* <Link to={'/home'}>
                <button>go back to Home</button>
            </Link> */}

            {
                bike.length ?
                    <div>
                        <img src={bike[0].image} alt='img not found' />
                        <div>
                            <h3>{bike[0].name}</h3>
                            <h4>{bike[0].type} </h4>
                            <h4>{bike[0].traction}</h4>
                            <p>${bike[0].price}</p>
                            <p>Rodado {bike[0].wheelSize}</p>
                            <p>{bike[0].rating}/10</p>
                        </div>
                        <Link to='/cart'>
                            <button > Reservar </button>
                        </Link>

                        <p>
                            <label>Accesorios</label>
                            <p>
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
                            </p>

                        </p>

                    </div>
                    :
                    <Loading />
            }
            <Footer />
        </>
    )
};