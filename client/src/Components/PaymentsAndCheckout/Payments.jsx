import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import s from './Payments.module.css'


const contacto = '/contact'
const accesories = '/allAccessories'

export const Payments = () => {

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
            <div className={s.pageHeading}>
              <h2>PAGOS Y RETIROS</h2>
            </div>
            <p style={{ color: "black" }}>Una vez que hayás recorrido todo el sitio buscando la Let o la aventura que "matcheen" con lo que querías, el sistema te guiará hacia el carrito para completar el pago.
            </p>
            <p style={{ color: "black" }}>
              Si elegiste una Let con sus accesorios, presentate en nuestra sucursal el día de inicio de tu reserva a partir de las 8am. Tenés hasta las 20pm de ese día para retirarla, pero cuanto más temprano lo hagas, más disfrutarás subido a tu Let.
            </p>
            <p style={{ color: "black" }}>
              Si optaste por una aventura, prestá atención a la siguiente información de acuerdo a cuál haya sido tu elección.
            </p>
            <p style={{ color: "black" }}>
              <strong>LUNA TUCUMANA</strong>
            </p>
            <ul className={s.featuredList}>
              <li>
                Días de salida: miércoles, jueves, viernes, sábados y domingos.
              </li>
              <li>
                Horario de salida: 20 horas (puntual).
              </li>
              <li>
                Horario de presentación: debés estar como mínimo treinta minutos antes para distribuir entre los asistentes el equipamiento correspondiente.
              </li>
              <li>
                Punto de encuentro: las salidas son siempre desde nuestra sucursal, salvo comunicación expresa en contrario.
              </li>
              <li>
                Observaciones: no hace falta llevar ropa ni calzado especial.
              </li>
            </ul>
            <p style={{ color: "black" }}>
              <strong>CIRCUITO DE LAS YUNGAS</strong>
            </p>
            <ul className={s.featuredList}>
              <li>
                Días de salida: martes, jueves y sábados.
              </li>
              <li>
                Horario de salida: 9 am (puntual).
              </li>
              <li>
                Horario de presentación: debés estar como mínimo treinta minutos antes para distribuir entre los asistentes el equipamiento correspondiente.
              </li>
              <li>
                Punto de encuentro: las salidas son siempre desde nuestra sucursal, salvo comunicación expresa en contrario.
              </li>
              <li>
                Observaciones: llevá ropa adecuada para realizar la ascensión al cerro. Sería bueno contar con calzado especial. Si no tenés el tuyo propio, podés {<a className={s.a} href={accesories}>alquilar</a>} los que ofrecemos en let's GO.
              </li>
            </ul>
            <p style={{ color: "black" }}>
              <strong>ESCAPADA A TAFÍ DEL VALLE</strong>
            </p>
            <ul className={s.featuredList}>
              <li>
                Días de salida: todos los viernes.
              </li>
              <li>
                Horario de salida: 8 am (puntual).
              </li>
              <li>
                Horario de presentación: debés estar como mínimo treinta minutos antes para distribuir entre los asistentes el equipamiento correspondiente.
              </li>
              <li>
                Punto de encuentro: las salidas son siempre desde nuestra sucursal, salvo comunicación expresa en contrario.
              </li>
              <li>
                Observaciones: llevá ropa adecuada para realizar la ascensión al cerro. Preveé abrigo y calzado especial. Si no tenés el tuyo propio, podés alquilar alguno de los que ofrecemos en let's GO.
              </li>
            </ul>
            <p style={{ color: "black" }}>
              <strong>TRASMONTAÑA</strong>
            </p>
            <ul className={s.featuredList}>
              <li>
                Día de salida: 13 de agosto de 2023
              </li>
              <li>
                Horario de salida: 6 am (puntual).
              </li>
              <li>
                Horario de presentación: debés estar como mínimo treinta minutos antes para distribuir entre los asistentes el equipamiento correspondiente.
              </li>
              <li>
                Punto de encuentro: las salidas son siempre desde nuestra sucursal, salvo comunicación expresa en contrario.
              </li>
              <li>
                Observaciones: si elegiste esta aventura es porque sos un biker entrenado. Recordá que se trata de una competencia de autosuficiencia en la que la ayuda externa está prohibida. En let's GO te proveemos una bicicleta de montaña equipada para la ocasión que cumple con los requisitos impuestos en el reglamento; 4 botellas por pareja; un lente y un casco de ciclismo rígido por participant, y los maillots (remeras) distintivos para la pareja. Además, cubrimos el costo de inscripción y un seguro de accidentes personales.  Las comidas, bebidas y materiales necesarios para la prueba, así como las herramientas y repuestos, corren por cuenta de cada participante.
                Let's GO trasladará a los inscriptos en trafic hasta el paraje de largada designado por la organización de la carrera.
              </li>
            </ul>

            <p style={{ color: "black" }}>
              Si después de leer esta información te queda alguna duda, {<a className={s.a} href={contacto}>contactate</a>} con nosotros que te responderemos a la brevedad.
            </p>
            <div className={s.containerBtn}>
              <button onClick={() => history.goBack()} className={s.btn2}>Atrás</button>
            </div>
          </div>
        </section >
      </div >
    </>
  )
};