import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import s from './TermsAndConditions.module.css'




export const TermsAndConditions = () => {

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
              <h2>TÉRMINOS Y CONDICIONES</h2>
            </div>
            <div className={s.row}>
              <div className={s.column}>
                <h3 className={s.heading}>
                  NUESTROS PRECIOS INCLUYEN
                  <span></span>
                </h3>
                <ul className={s.featuredList}>
                  <li>
                    Todos los servicios que se mencionan específicamente en cada producto y aventura. Los precios incluyen impuestos y están sujetos a cambios sin previo aviso hasta el momento en que el cliente abona la totalidad de los servicios contratados.
                  </li>
                </ul>
                <h3 className={s.heading}>
                  NUESTROS PRECIOS NO INCLUYEN
                  <span></span>
                </h3>
                <ul className={s.featuredList}>
                  <li>
                    Entradas a reservas naturales, tasas, ni otros ítems no especificadas en el servicio.
                  </li>
                  <li>
                    Propinas de tipo personal como a guías, conductores, mozos, etcétera.
                  </li>
                  <li>
                    Todo servicio no especificado en el detalle del producto.
                  </li>
                  <li>
                    Extras de ningún tipo o gastos que no estén debidamente especificados en los servicios.
                  </li>
                  <h3 className={s.heading}>
                    CAMBIOS Y CANCELACIONES
                    <span></span>
                  </h3>
                  <ul className={s.featuredList}>
                    <li>
                      Por parte de la empresa: let’s GO se reserva la facultad de anular justificadamente la contratación de una bicicleta o de una aventura en las siguientes circunstancias:
                      Hechos de fuerza mayor. Se procederá a la devolución de la cantidad total percibida hasta ese momento, menos los gastos que se deriven de la transacción bancaria efectuada.
                    </li>
                    <li>
                      Por parte del cliente: Todos los cambios y las cancelaciones deberán ser notificadas por escrito a let’s GO sea por medio del formulario de contacto o por correo electrónico.
                    </li>
                    <li>
                      En los casos donde haya servicios con condiciones especiales para su cancelación estas serán informadas en el detalle del producto.
                    </li>
                  </ul>
                  <p style={{ color: "black" }}>Para cambios y cancelaciones en reservas de bicicletas o aventuras los gastos serán las siguientes:
                  </p>
                  <p style={{ color: "black" }}>
                    <strong>Cambios</strong>
                  </p>
                  <ul className={s.featuredList}>
                    <li>
                      Cambio de fecha: No se cobran gastos ni extra de un servicio siempre que hubiera disponibilidad en la nueva fecha solicitada y el cambio se realizara dentro del tiempo límite informado en la tarifa.
                    </li>
                    <li>
                      Modificación de reserva en cantidad de servicios: No se cobrarán gastos.
                    </li>
                    <li>
                      Modificación de reserva en cantidad de pasajeros: No se cobrarán gastos.
                    </li>
                  </ul>
                  <p style={{ color: "black" }}>
                    <strong>Cancelaciones</strong>
                  </p>
                  <ul className={s.featuredList}>
                    <li>
                      Sin cargo hasta el tiempo límite informado en la tarifa.
                    </li>
                    <li>
                      Con cargo de 50 % hasta las 17 PM del día anterior al servicio**.
                    </li>
                    <li>
                      Sin devolución a partir de las 17 PM del día anterior o ya comenzado el servicio**.
                    </li>
                  </ul>
                  <p style={{ color: "black", fontSize: '.9rem' }}>
                    **let’s GO se reserva el derecho a considerar la devolución u otorgar una nota de crédito a favor del cliente para los casos donde hubiera gastos por cancelación de servicios.

                    En caso de fines de semana largos, Semana Santa, temporada alta, Navidad y Año Nuevo, independientemente de la antelación con que se cancelen los servicios, existirán montos no reembolsables.

                    En los casos en donde pasajeros que desistieran voluntariamente de utilizar cualquier servicio sin previo aviso, no tendrán derecho a exigir devolución alguna por dichos servicios. No hay reembolso por ningún servicio no utilizado en nuestras aventuras.
                  </p>
                  <h3 className={s.heading}>
                    RECLAMOS
                    <span></span>
                  </h3>
                  <p style={{ color: "black" }}>
                    Cualquier reclamo que desee efectuarse deberá ser dirigido, dentro de los 30 días de finalizado el viaje o de ocurrido el hecho que lo motivare por medio del formulario de contacto del sitio. Cumplido dicho lapso no se recibirá reclamo alguno.
                  </p>
                  <h3 className={s.heading}>
                    RESPONSABILIDADES
                    <span></span>
                  </h3>
                  <ul className={s.featuredList}>
                    <li>
                      Si por razones con causa justificada let’s GO se viera obligada a suspender cualquiera de sus servicios, los clientes inscriptos no tendrán más derecho que el reembolso que correspondiere del importe abonado, con renuncia expresa a cualquier otro reclamo.
                    </li>
                    <li>
                      let’s GO no se responsabiliza por el equipaje y demás efectos personales del cliente, los que viajan por cuenta y riesgo de éste.
                    </li>
                    <li>
                      let’s GO no se responsabiliza por las malas condiciones atmosféricas naturales, por manifestaciones, tumultos, o por cualquier caso fortuito o de fuerza mayor no imputable a la voluntad de cualquiera de las partes, que afectare el viaje contratado por los pasajeros.
                    </li>
                  </ul>
                  <h3 className={s.heading}>
                    ACEPTACIÓN DEL CLIENTE
                    <span></span>
                  </h3>
                  <p style={{ color: "black" }}>
                    El cliente declara conocer y aceptar las presentes condiciones generales de contratación y dicha aceptación queda ratificada por:
                  </p>
                  <li>
                    El pago de los servicios contratados antes del su inicio, por cualquier forma o modalidad.
                  </li>
                  <li>
                    La aceptación de la factura de los servicios contratados.
                  </li>
                  <li>
                    Mediante el uso de una porción cualquiera de los servicios contratados.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
};