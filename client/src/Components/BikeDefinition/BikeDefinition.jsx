import React, { useEffect } from "react";
import s from './BikeDefinition.module.css'

export const BikeDefinition = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={s.page}>
            <section className={s.pageBlock}>
                <div className={s.container}>
                    <div className={s.pageHeading}>
                        <h2>Qué es una bicicleta: definición y significado</h2>
                    </div>
                    <p style={{ color: "black" }}>
                        Si ahora mismo te preguntáramos acerca de qué es una bicicleta,
                        lo más seguro es que en tu mente se forme la imagen de una y digas que es un vehículo de dos ruedas y un manillar,
                        que no necesita ningún tipo de combustible más que la fuerza física de una persona para funcionar y que es sostenible porque no contamina.
                        Pero, ¿y si te pidiéramos un significado de bicicleta más preciso?
                    </p>
                    <p style={{ color: "black" }}>
                        Por ejemplo, ¿sabes de dónde viene la palabra bicicleta y su significado?
                        ¿Cuáles son los distintos usos de una bicicleta?
                        No te preocupes, porque ahora mismo vamos a ayudarte a que conozcas todo sobre este medio de transporte que tan de moda está ahora.

                    </p>

                    <h3 className={s.heading}>
                        Origen de la palabra "bicicleta"
                        <span></span>
                    </h3>

                    <p style={{ color: "black" }}>
                        Antes de entrar de lleno en hablarte de qué es una bicicleta,
                        conviene que conozcas de dónde viene, es decir, cuál es el origen de la palabra, ya que necesitas saber el motivo por el que se le llama "bicicleta" y no de otra forma.
                    </p>

                    <p style={{ color: "black" }}>
                        La palabra bicicleta proviene de tres idiomas diferentes: el latín, el griego y francés. Se forma de la siguiente manera:
                    </p>

                    <ul className={s.featuredList}>
                        <li>
                            "bi-", prefijo latino que significa "dos".
                        </li>
                        <li>
                            "kyklos", palabra griega que significa "rueda".
                        </li>
                        <li>
                            "-ette", diminutivo francés.
                        </li>
                    </ul>

                    <p style={{ color: "black" }}>
                        Así, el significado de bicicleta indica que es un medio de transporte compuesto por dos ruedas.
                        Los pedales, junto con la cadena, el plato y el piñón, son los elementos que permiten que las ruedas se muevan.
                        Algo para lo que es necesario que la persona ejerza su propia propulsión, es decir, que pedalee.
                        Esta acción hace que gire la rueda trasera y la delantera, permitiendo así el desplazamiento.
                    </p>

                    <p style={{ color: "black" }}>
                        Todos los elementos que forman una bicicleta se integran en una estructura denominada "cuadro",
                        donde además se ubica un asiento o sillín y un manubrio o manillar para poder controlar la dirección en la que se quiere ir.
                    </p>

                    <h3 className={s.heading}>
                        Para qué sirve la bicicleta
                        <span></span>
                    </h3>

                    <p style={{ color: "black" }}>
                        No hay duda de que el uso de una bicicleta está ligado a ser un medio de transporte.
                        Las bicis se pueden utilizar tanto en entornos urbanos como en rurales, con la ventaja de que no necesitan ningún tipo de combustible contaminante para funcionar.
                        Por eso, se las considera ecológicas y sostenibles, ya que la energía que necesitan para funcionar la obtienen del usuario que realiza una actividad física que transforma esa energía en movimiento.
                    </p>

                    <p style={{ color: "black" }}>
                        Además, la bicicleta es uno de los vehículos más económicos, porque no hay que "recargarle ningún depósito" y porque además cuestan menos que otro tipo de vehículo.
                        Si a eso se le une el hecho de que apenas tiene gastos de mantenimiento y permite olvidarte de atascos y viajar de manera más libre que con otro medio de transporte, tendríamos un plus en su uso.
                    </p>

                    <p style={{ color: "black" }}>
                        Cada vez son más los que se han dado cuenta de las ventajas que tiene el uso de una bicicleta sobre otros vehículos, y es la razón por la que, tanto en las grandes ciudades como en muchas más pequeñas, están fomentando su uso.
                    </p>

                    <p style={{ color: "black" }}>
                        La bicicleta se ha convertido en un medio de transporte saludable, ecológico y sostenible, y es fácil funcionar con él.
                        Pero, si además cuentas con una empresa como la nuestra, que se ocupa del mantenimiento de tu bici y de su reparación para que tú solo tengas que centrarte en disfrutar, las ventajas son mucho mayores.
                    </p>

                </div>
            </section>
        </div>
    )
}