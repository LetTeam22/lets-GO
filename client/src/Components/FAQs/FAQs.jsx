import React, { useEffect } from "react";
import s from './FAQs.module.css'

export const FAQs = () => {

    const contacto = '/contact'
    const how = '/how'
    const promotions = '/promotions'

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
                            ¿Cómo hago para alquilar una Let?
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Si querés ver paso a paso cómo alquilar tu Let y subirte a una nueva aventura, podés visitar nuestro apartado de {<a className={s.a} href={how}>cómo alquilar</a>} donde con un video explicativo te guiamos por todo el proceso.
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
                            ¿En qué ciudades está disponible el servicio de let’s GO?
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Por el momento, let's GO está presente únicamente en la ciudad de San Miguel de Tucumán.
                        </p>
                        <h3 className={s.heading}>
                            ¿Qué ocurre si la Let que alquilé sufre algún desperfecto o avería?
                            <span></span>
                        </h3>
                        <p style={{ color: "black" }}>
                            Si durante los días de alquiler tu Let sufre algún desperfecto técnico menor y no imputable al mal uso que se pudiera haber hecho de la bicicleta -por ejemplo, si se pinchó una cubierta o se te trabó el sistema de cambios- acercate a nuestro local así nuestros técnicos evalúen la situación. Si no pueden resolverlo en ese momento y siempre que tengamos disponibilidad, te reemplazaremos la bici averiada por una Let equivalente. En caso de no contar con stock, generaremos una nota de crédito a tu favor para que no te quedes con las ganas de subirte a una Let.
                        </p>
                        <h3 className={s.heading}>
                            ¿Qué ocurre si no la devuelvo el día acordado?
                            <span></span>
                        </h3>
                        <p style={{ color: "black" }}>
                            Como lo indicamos en una de las respuestas anteriores, los días en let's GO corren de 8 am a 20 pm. Por lo tanto, si quisieras seguir usando tu Let más allá del tiempo pactado, podés comunicarlo antes de vencido el término sin generar otro costo extra que el equivalente al día de renta extra. Si por el motivo que fuere no comunicás tu intención de extender el período de alquiler, al momento de devolver la bicicleta se computarán los días impagos que se agregaron a la contratación inicial, más una multa equivalente a dos días de uso de la Let correspondiente. Si pasados diez días corridos del vencimiento de la contratación la bicicleta no fuera devuelta, la consideraremos perdida y procederemos a cargar en la tarjeta de crédito asociada a la reserva el equivalente a 60 días de alquiler de la Let correspondiente. Dicho importe no será reintegrado ni aún cuando la bici sea devuelta en fecha posterior a los diez días contados a partir del mencionado vencimiento.
                        </p>
                        <h3 className={s.heading}>
                            ¿Existe la opción de compra de la Let que estoy alquilando?
                            <span></span>
                        </h3>
                        <p style={{ color: "black" }}>
                            Por el momento el stock de bicicletas está destinado solamente a alquiler. Pero como sabemos que apenas te subas a una Let no vas a querer bajarte más, escribinos y consultanos por descuentos exclusivos para alquileres prolongados.
                        </p>
                        
                    </div>
                </section>
            </div>
        </>
    )
}