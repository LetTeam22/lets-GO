import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import s from './EBike.module.css'

export const EBike = () => {

    const history = useHistory()

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
                        <div className={s.containerBtn}>
                            <button onClick={() => history.goBack()} className={s.btn2}>VOLVER</button>
                        </div>
                        <div className={s.pageHeading}>
                            <h2>¿Cómo funciona una bici eléctrica?</h2>
                        </div>
                        <p style={{ color: "black" }}>
                            Las e-bikes son las bicicletas más modernas que existen hasta el momento, y se caracterizan por disponer de una batería y un motor que permite un mejor funcionamiento de la rueda trasera.
                            En otras palabras, hace que el esfuerzo a la hora de pedalear sea más suave y sencillo.
                            Pero, ¿qué sabés de la bicicleta e-bike?
                            ¿Pensás que un motor eléctrico en la bicicleta ya te exime de tener que pedalear?
                        </p>

                        <p style={{ color: "black" }}>
                            Las bicis eléctricas son ahora mismo grandes desconocidas. Por eso, hoy queremos ayudarte a entenderlas a la perfección enseñándote cómo funciona una bicicleta eléctrica.
                        </p>

                        <p style={{ color: "black" }}>
                            Si has visto las e-bikes y has pensado que es la herramienta que estabas esperando para dejar aparcado tu coche o moto,
                            antes de escogerla como medio de transporte has de saber cómo funciona.
                        </p>

                        <h3 className={s.heading}>
                            Bicicleta asistida
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            La bicicleta eléctrica se diferencia de una bici tradicional o mecánica en que incluye un motor eléctrico.
                            Ahora bien, ese motor no hará que la bicicleta se mueva sola, sino que te servirá como ayuda a la hora de pedalear.
                            ¿Qué quiere decir esto? Que una bicicleta e-bike no es una motocicleta; no va a moverse sola al accionar el motor que lleva, sino que, a través de un sensor del pedaleo,
                            detectará cuándo es necesario que el motor te eche una mano para determinados momentos.
                        </p>

                        <h3 className={s.heading}>
                            Batería recargable
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Este motor eléctrico en la bicicleta lleva a su vez una batería recargable.
                            Normalmente se sitúa en el tubo transversal de la estructura de la bicicleta y puede tener distintas capacidades,
                            razón por la que una bici puede ser más o menos pesada (o puede tardar más o menos en cargarse la batería).
                            Esta batería tiene la ventaja de que se puede quitar de la bicicleta para recargarla en cualquier enchufe o para no utilizar el motor de la e-bike en caso de que no te haga falta.
                            Por ejemplo, en el caso de nuestras Let electricas, tenés algo más de 25 kilómetros de alcance con la batería, y después podés cargarla en casa o en la oficina para volver a contar con ella al 100%.
                        </p>

                        <h3 className={s.heading}>
                            Para qué sirve una bicicleta eléctrica
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Hoy en día, e-bikes hay muchas, no solo en cuanto a marcas y modelos, sino también basadas en el uso que les quieras dar.
                            Es decir, podés encontar e-bikes de montaña, bicicletas asistidas para pasear, otras enfocadas para poder moverte por la ciudad, etcétera.
                            Cada una de ellas tiene una serie de características que la hacen más específica para unas necesidades concretas. Por eso, la bicicleta e-bike puede usarse para múltiples funciones:
                        </p>

                        <ul className={s.featuredList}>
                            <li>
                                Para ir de paseo
                            </li>
                            <li>
                                Para recorrer la ciudad
                            </li>
                            <li>
                                Para zonas de montaña
                            </li>
                        </ul>

                        <p style={{ color: "black" }}>
                            Debés tener en cuenta que una e-bike es recomendable en zonas con grandes cuestas, ya sea en montañas o incluso en ciudades que, debido a su orografía, cuentan con calles con con pendientes, algunas muy pronunciadas,
                            que pueden necesitar de una ayuda a la hora de superarlas sin ser un ciclista profesional.
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}