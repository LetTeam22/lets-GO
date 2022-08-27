import React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getBikeDetail } from '../../Redux/actions';
import Loading from '../Loading/Loading';
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
            {/* <h1> Estas en Bike Detail</h1>
            <Link to={'/home'}>
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
                            <span>{bike[0].price}</span>
                            <span>{bike[0].wheelSize}</span>
                            <span>{bike[0].rating}</span>
                        </div>

                    </div>
                    :
                    <Loading />
            }
            <Footer />
        </>
    )
};