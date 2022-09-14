import React, { useEffect } from "react";
import s from './FAQs.module.css'

export const FAQs = () => {

    const contacto = '/contact'
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className={s.left} />
            <div className={s.right} />
            <div className={s.page}>
                <section className={s.pageBlock}>
                    <div className={s.container}>
                        <div className={s.pageHeading}>
                            <h2>PREGUNTAS FRECUENTES</h2>
                        </div>
                        <p style={{ color: "black" }}>
                            En esta sección encontrarás respuesta a las dudas más comunes que nos plantean los leters. Si alguna de tus preguntas no está contestada en esta sección, no dudes en dirigirte a nuestro apartado de {<a className={s.a} href={contacto}>contacto</a>} y transmitirnos tu inquietud. A la brevedad nos comunicaremos con vos.
                        </p>

                        <h3 className={s.heading}>
                            ¿Cómo se cuentan los días de alquiler de bicicleta?
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Un día let's GO empieza a las 8 am y termina a las 20 pm. Si necesitás la bicicleta después de la hora de finalización, se computa como un nuevo día y tenés hasta las 20 horas de la siguiente jornada para devolverla.
                        </p>

                        <h3 className={s.heading}>
                            ¿Qué incluye el alquiler de mi let?
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Cuando ingresés al detalle de alguna Let que te haya gustado, vas a tener la posibilidad de seleccionar los distintos accesorios que te ofrecemos, todos con un costo adicional cuyo total se indica de forma visible antes de pasar al carrito para concretar tu reserva.
                            
                        </p>

                        <h3 className={s.heading}>
                            ¿Tengo que pagar alguna fianza o depósito por usar una Let?
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            En absoluto. Como todo el proceso de alquiler de las Let se realiza de manera online y mediante algún medio de pago electrónico, no hace falta que dejés ningún importe a modo de fianza o depósito. Los costos que excepcionalmente surgieren se cargarán en la tarjeta de crédito del cliente, previa comunicación de la situación.
                        </p>

                        <h3 className={s.heading}>
                            ¿En qué ciudades está disponible let’s GO?
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Por el momento, let's GO está presente únicamente en la ciudad de San Miguel de Tucumán.
                        </p>
                        <h3 className={s.heading}>
                            ¿Qué hago si la Let que alquilé sufre algún desperfecto o avería?
                            <span></span>
                        </h3>
                        <p style={{ color: "black" }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non nobis quibusdam dolorum, alias id qui et numquam, animi ratione tenetur saepe. Id repellat molestiae autem officia quidem molestias atque itaque.
                        </p>
                        <h3 className={s.heading}>
                            ¿Qué hago si la Let que alquilé sufre algún desperfecto o avería?
                            <span></span>
                        </h3>
                        <p style={{ color: "black" }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non nobis quibusdam dolorum, alias id qui et numquam, animi ratione tenetur saepe. Id repellat molestiae autem officia quidem molestias atque itaque.
                        </p>
                        <h3 className={s.heading}>
                            ¿Qué ocurre si no la devuelvo el día acordado?
                            <span></span>
                        </h3>
                        <p style={{ color: "black" }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non nobis quibusdam dolorum, alias id qui et numquam, animi ratione tenetur saepe. Id repellat molestiae autem officia quidem molestias atque itaque.
                        </p>
                        
                    </div>
                </section>
            </div>
        </>
    )
}