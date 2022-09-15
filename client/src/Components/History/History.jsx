import React, { useEffect } from "react";
import s from './History.module.css'

export const History = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
            <div className={s.left} />
            <div className={s.right} />
            <div className={s.pageBlock}>
                <div className={s.container}>
                    <div className={s.pageHeading}>
                        <h2>
                            Los orígenes de la bicicleta
                        </h2>
                    </div>

                    <p style={{ color: "black" }}>
                        Dentro de la historia de la bicicleta hay un nombre propio que no podemos evitar citar: Karl Freiherr von Drais, el alemán que inventó la bicicleta en 1817 creando una estructura hecha de madera.
                        Según los expertos y los registros que se tienen, el diseño de la bicicleta en ese año no era para nada como la conocemos actualmente.
                        Primero, porque no tenía pedales. Había que impulsarse con los pies, como si fuera un patinete, hasta que esta cogiera velocidad. ¿Y para frenar? Pues lo mismo, con los pies.
                    </p>

                    <p style={{ color: "black" }}>
                        A pesar de su rudimentario diseño y de que no pareciera demasiado práctica, lo cierto es que la Draisiana, como se bautizó a esta primera bicicleta, fue un éxito entre las personas y muchos se animaron a tener una.
                        Afortunadamente, años después, en 1839, se produjo una gran evolución de la bicicleta. Aquí es donde entra en juego otro nombre: Kirkpatrick Macmillan, un escocés que supo ver el concepto de von Drais e implementó mejoras sobre su estructura.
                    </p>

                    <p style={{ color: "black" }}>
                        ¿Qué hizo? Le puso a la bicicleta ruedas y pedales de tal manera que consiguió que no hiciera falta ningún impulso para que la bicicleta pudiera andar.
                        Eso sí, la forma en que los pedales movían la bicicleta no se hacía con cadenas, sino a través de unos hierros conectados a las ruedas con el fin de que estas se movieran al pedalear.
                    </p>

                    <p style={{ color: "black" }}>
                        La siguiente fecha que supuso una revolución dentro de la invención de la bicicleta es 1861. Ese año, Pierre Michaux consiguió mejorar aún más el diseño de Kard Drais y Kirkpatrick Macmillan.
                        Sin embargo, no fue tan bueno como los anteriores. El francés colocó pedales justo en la rueda delantera, pero surgió el problema de que desestabilizaba la bicicleta.
                    </p>

                    <p style={{ color: "black" }}>
                        Otra fecha importante en la historia de la bicicleta es 1861. Ese año, Pierre Michaux consiguió mejorar aún más el diseño de Kard Drais y Kirkpatrick Macmillan.
                        Sin embargo, no fue tan bueno como los anteriores. El francés colocó pedales justo en la rueda delantera, pero surgió el problema de que desestabilizaba la bicicleta.
                    </p>

                    <h3 className={s.heading}>
                        ¿Cuándo apareció la bicicleta moderna?
                        <span></span>
                    </h3>

                    <p style={{ color: "black" }}>
                        El inventor al que le debemos la bicicleta moderna es John Kemp Starley. Este inglés sacó al mercado la Safety Bicycle, o lo que es lo mismo, la "bicicleta de seguridad”,
                        cuyo diseño es mucho más cercano a lo que conocemos hoy en día, ya que tenía frenos y una estructura similar a la de ahora. Este modelo de bici fue puesto en el mercado en 1885 y, tres años después, se le añadieron unos neumáticos con cámara de aire, una invención de John Boyd Dunlop.
                    </p>
                </div>
            </div>
            </>
            )
}