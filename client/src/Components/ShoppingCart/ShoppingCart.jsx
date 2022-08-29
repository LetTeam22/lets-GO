import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBikes } from "../../Redux/actions";
// import s from './ShoppingCart.module.css';

export const ShoppingCart = () => {
    // deberia hacer un dispatch del estado allbikes??
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings);
    const allBikes = useSelector((state) => state.allBikes);
    let cartBikes = []

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

    //total tambien deberia tener en cuenta los precios de cada accesorio seleccionado
    // y multiplicar por la cantidad de dias que se este por alquilar
    const total = cartBikes.reduce((total, act) => {
        return total + act.price;
    }, 0);

    return (
        <div>
            {console.log(cartBikes)}
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
                            <p>$ {bike.price} </p>
                            {/* Aqui deberia renderizar los accesorios que hayan sido seleccionados */}
                        </div>
                    )
                }) :
                    <h2>aún no cargaste nada en el carrito </h2>
            }
            {/*Deberia incluir un subtotal por cada bicicleta  */}
            {
                cartBikes.length &&
                <div>
                    <h2>{`Total $ ${total}`}</h2>
                    <button>Reservar</button>
                </div>
            }


        </div>
    )
};


