import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { getBikeDetail, addBooking } from '../../Redux/actions';
import { Loading } from '../Loading/Loading';


export const BikeDetail = () => {

    const dispatch = useDispatch()
    const bike = useSelector((state) => state.bikeDetail)
    const { bikeId } = useParams()
    const history = useHistory()

    const [input, setInput] = useState({
        bike: bikeId,
        canasto: false,
        silla: false,
        luces: false,
        casco: false,
        candado: false,
        lentes: false,
        botella: false,
        calzado: false
    })



    useEffect(() => {
        dispatch(getBikeDetail(bikeId))
        //     dispatch(resetState()) /// ¿creo una action?
    }, [dispatch, bikeId])

    const handleClick = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(addBooking(input));
        setInput({
            canasto: false, silla: false, luces: false, casco: false, candado: false, lentes: false, botella: false, calzado: false
        })
        history.push('/cart')
    }

    const handleCheck = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.checked
        });
    }

    return (
        <>
            {!!bike.length ? <Loading /> :
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

                    <button onClick={e => { handleClick(e) }}> Agregar al carrito </button>


                    <div>
                        <label>Accesorios</label>
                        <div>
                            <label>Canasto</label>
                            <input type='checkbox' name='canasto' onClick={e => { handleCheck(e) }} />

                            <label>Silla porta bebes</label>
                            <input type='checkbox' name='silla' onClick={e => { handleCheck(e) }} />

                            <label>Luces</label>
                            <input type='checkbox' name='luces' onClick={e => { handleCheck(e) }} />

                            <label>Casco</label>
                            <input type='checkbox' name='casco' onClick={e => { handleCheck(e) }} />

                            <label>Candado</label>
                            <input type='checkbox' name='candado' onClick={e => { handleCheck(e) }} />

                            <label>Lentes</label>
                            <input type='checkbox' name='lentes' onClick={e => { handleCheck(e) }} />

                            <label>Botella</label>
                            <input type='checkbox' name='botella' onClick={e => { handleCheck(e) }} />

                            <label>Calzado</label>
                            <input type='checkbox' name='calzado' onClick={e => { handleCheck(e) }} />
                        </div>

                    </div>

                </div>

            }
        </>
    )
};