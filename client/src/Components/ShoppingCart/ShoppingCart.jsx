



import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getBikes, getUser, postBookings } from "../../Redux/actions";
// import s from './ShoppingCart.module.css';
import Dates from "../Dates/Dates";


export const ShoppingCart = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const bookings = useSelector((state) => state.bookings);
    const date = useSelector((state) => state.parameters.date);
    const user = useSelector((state) => state.user);
    const allBikes = useSelector((state) => state.allBikes);
    let cartBikes = [];


    for (let bike of allBikes) {
        for (let book of bookings)
            if (bike.idBike === parseInt(book.bike, 10)) {
                let pushedbike = {
                    idBike: bike.idBike,
                    name: bike.name,
                    price: parseInt(bike.price, 10),
                    image: bike.image,
                    accesories: {
                        canasto: book.canasto,
                        silla: book.silla,
                        luces: book.luces,
                        casco: book.casco,
                        candado: book.candado,
                        lentes: book.lentes,
                        botella: book.botella,
                        calzado: book.calzado
                    }
                }
                cartBikes.push(pushedbike)
            }
    }


    let postbikeIds = cartBikes.map(bikes => bikes.idBike)

    let postedBooking = {
        startDate: date.from,
        endDate: date.to,
        userId: user.idUser,
        bikeIds: postbikeIds
    }

    //total tambien deberia tener en cuenta los precios de cada accesorio seleccionado
    // y multiplicar por la cantidad de dias que se este por alquilar
    const total = cartBikes.reduce((total, act) => {
        return total + act.price;
    }, 0);


    useEffect(() => {
        dispatch(getBikes())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUser(JSON.parse(localStorage.getItem('user')).email))
    }, [dispatch])

    const handleBooking = (e) => {
        dispatch(postBookings(postedBooking));
        alert('Reserva confirmada');
        history.push('/home')
    }

    return (
        <div>

            {/* NOTA: h1 queda tapado por el menu */}
            <br />
            <br />
            <br />
            <br />
            <br />

            <h1>Carrito de compras</h1>

            {
                cartBikes.length ? cartBikes.map(bike => {
                    return (
                        <div key={bike.idBike}>
                            <p>{bike.name}</p>
                            <img src={bike.image} alt="not found" />

                            <p>$ {bike.price} / día </p>
                            
                            {/* Aqui deberia renderizar los accesorios que hayan sido seleccionados */}
                        </div>
                    )
                }) :

                    <>
                        <h2>aún no cargaste nada en el carrito </h2>
                        <Link to='/home'>
                            <button> Volver al Home</button>
                        </Link>
                    </>
            }
            {/*Deberia incluir un subtotal por cada bicicleta  */}
            
            {
                cartBikes.length &&
                <div>
                    <h2>{`Total $ ${total}`}</h2>

                    <Dates />
                    <button 
                        disabled={postedBooking.startDate === '' || postedBooking.endDate === '' || postedBooking.userId === undefined || !postedBooking.bikeIds.length ? true : false}  
                        onClick={e => handleBooking(e)}
                    >Reservar</button>
                    
                </div>
            }
        </div>
    )
};

