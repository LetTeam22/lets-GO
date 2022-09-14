import React from "react";
import s from './QuienesSomos.module.css';


export const QuienesSomos = () => {
    return (
        <div className={s.container}>
            <span className={s.mainTitle}>¿QUIÉNES SOMOS?</span>
            <span className={s.subTitle}>dos caras de la misma rueda…</span>
            <div className={s.containerText}>
                <div className={s.text1}>
                    <h3 className={s.title}>let's GO</h3>
                    <p className={s.p}>
                    Este emprendimiento nace del deseo de fomentar el movimiento y el cuidado propio y colectivo. Comprendimos y compartimos  la necesidad de muchas personas de trasladarse de forma saludable, ecológica y divertida. 
                    En let's GO ofrecemos alquiler temporal de bicicletas. “0% emisión, 100% emoción” no es sólo una buena frase: es nuestra filosofía. ¡Sumate! Disfrutá la vida al aire libre, cuidá tu salud y el medioambiente al mismo tiempo. 
                    No importa si sos un ciclista experto o uno amateur. Lo que cuenta es ser un “leter”.
                    Para conocer cómo alquilar una bici mirá el siguiente video
                    </p>
                </div>
                <div className={s.video}><span className={s.span}>ESPACIO PARA VIDEO</span></div>
                <div className={s.text1}>
                    <h3 className={s.title}>El proyecto</h3>
                    <p className={s.p}>
                    Somos un grupo de personas que se encontraron cursando la carrera Desarrollador Full Stack en el Bootcamp de Soy Henry. Habernos  elegido como compañeros y compartir mil horas de producción con un objetivo común,
                    dieron como resultado una linda amistad y una idea novedosa. let’s GO es nuestro proyecto final de carrera, donde volcamos todos los conocimientos aprendidos en el cursado. Para conocer más sobre las tecnologías aplicadas y los
                    integrantes, hacé click en el siguiente enlace
                    </p>
                    <button className={s.btn}>VER</button>
                </div>
            </div>
        </div>
    )
}