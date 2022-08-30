import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { getBikeDetail, addBooking } from '../../Redux/actions';
import { Loading } from '../Loading/Loading';
import s from './BikeDetail.module.css'


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
                <div className={s.container}>
                    <div className={s.name}>
                        <div className={s.wrapper}>
                            <h3 className={s.title}>{bike.name}</h3>
                            <p>Estás a punto de hacer tu mejor elección...</p>
                        </div>
                    </div>
                    <div className={s.row}>
                        <div className={s.txt}>
                            {/*párrafo provisorio hasta tener descripción*/}
                            <p className={s.ph}>{bike.description}</p>
                            <h4>· Tipo {bike.type} </h4>
                            <h4>· Tracción {bike.traction}</h4>
                            <h4>· Rodado {bike.wheelSize}</h4>
                            <h4>· Puntuación {bike.rating}/10</h4>
                            <h4>¡Llevala con vos por sólo ${bike.price} por día!</h4>
                            <label>Accesorios opcionales:</label>
                            <div className={s.div1}>
                                <label>canasto</label>
                                <input type='checkbox' name='canasto' onClick={e => { handleCheck(e) }} />

                                <label>silla portabebés</label>
                                <input type='checkbox' name='silla' onClick={e => { handleCheck(e) }} />

                                <label>luces</label>
                                <input type='checkbox' name='luces' onClick={e => { handleCheck(e) }} />

                                <label>casco</label>
                                <input type='checkbox' name='casco' onClick={e => { handleCheck(e) }} />

                            </div>
                            <div className={s.div1}>
                                <label>candado</label>
                                <input type='checkbox' name='candado' onClick={e => { handleCheck(e) }} />

                                <label>lentes</label>
                                <input type='checkbox' name='lentes' onClick={e => { handleCheck(e) }} />

                                <label>botella</label>
                                <input type='checkbox' name='botella' onClick={e => { handleCheck(e) }} />

                                <label>calzado</label>
                                <input type='checkbox' name='calzado' onClick={e => { handleCheck(e) }} />
                            </div>
                            <div className={s.btn1}>
                                <button className={s.btn2} onClick={e => { handleClick(e) }}> Agregar al carrito </button>
                            </div>
                        </div>
                        <div className={s.image1}>
                            <div className={s.image2}>
                                <img className={s.img} src={bike.image} alt='img not found' />
                            </div>
                        </div>
                    </div>
                    <div className={s.gallery}>
                        <div>
                            <img className={s.photo} src="https://www.ternbicycles.com/sites/default/files/styles/small_rectangle_2x/public/images/bikes/other/2020/07/tn-photo-verge-s8i-belt-drive-web.jpg.webp?itok=UGa8TR7B" alt="img not found" />
                        </div>
                        <div>
                            <img className={s.photo} src="https://www.ternbicycles.com/sites/default/files/styles/small_rectangle_2x/public/images/bikes/other/2020/07/tn-photo-verge-s8i-belt-drive-web.jpg.webp?itok=UGa8TR7B" alt="img not found" />
                        </div>
                        <div>
                            <img className={s.photo} src="https://www.ternbicycles.com/sites/default/files/styles/small_rectangle_2x/public/images/bikes/other/2020/07/tn-photo-verge-s8i-belt-drive-web.jpg.webp?itok=UGa8TR7B" alt="img not found" />
                        </div>
                    </div>
                </div>

            }
        </>
    )
};