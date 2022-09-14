import React, { useEffect } from "react";
import s from './Normative.module.css'


export const Normative = () => {

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
              <h2>LAS BICIS Y SU NORMATIVA</h2>
            </div>
            <div className={s.row}>
              <div className={s.column}>
                <h3 className={s.heading}>
                  ¿Se me aplican las reglas generales de tránsito cuando ando en bici?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>Sí. Por el solo hecho de circular con una bicicleta ya te rigen las normas que regulan el uso de la vía pública.</p>
                <ul className={s.featuredList}>
                  <li>
                    Ley Nacional Nº 24.449
                  </li>
                  <li>
                    Ley Provincial Nº 9.554
                  </li>
                </ul>
                <h3 className={s.heading}>
                  ¿Cuáles son las reglas generales de circulación que debo respetar cuando ando en bicicleta?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>A modo de ejemplo:</p>
                <ul className={s.featuredList}>
                  <li>
                    Frenar en los semáforos en rojo.
                  </li>
                  <li>
                    Ceder el paso a peatones en esquinas y cruces peatonales.
                  </li>
                  <li>
                    Anticipar maniobras de giro con la mano.
                  </li>
                </ul>
                <h3 className={s.heading}>
                  ¿Hay reglas especiales para quienes conducen bicicletas?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>Sí. Es obligatorio usar casco homologado o certificado.
                  Además:
                </p>
                <ul className={s.featuredList}>
                  <li>
                    En las calles y avenidas con ciclovías se debe circular exclusivamente por ellas.
                  </li>
                  <li>
                    En las calles sin ciclovías se debe circular por el borde derecho. Sólo puede abandonarse esa posición para superar vehículos más lentos o detenidos.
                  </li>
                  <li>
                    Las bicicletas tienen prioridad de paso respecto de los autos cuando estos giren a derecha o izquierda para ingresar a otra calle. También tienen prioridad cuando circulan en grupo de ciclistas y el primero ya ingresó a la bocacalle.
                  </li>
                  <li>
                    Se debe circular siempre con ambas ruedas en contacto con el piso y con ambas manos sobre el manubrio.
                  </li>
                  <li>
                    No se puede circular en zigzag.
                  </li>
                  <li>
                    Está prohibido circular asido a otro vehículo.
                  </li>
                  <li>
                    Está prohibido circular por calles peatonales.
                  </li>
                </ul>
                <h3 className={s.heading}>
                  ¿Qué son las bicisendas y las ciclovías?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>
                  Las bicisendas son sectores que están sobre veredas o en espacios verdes para que circulen las bicicletas. Están señalizados y acondicionados especialmente para que circulen las bicicletas.
                  Las ciclovías son carriles exclusivos para las bicicletas en calles y avenidas que están separados, mediante construcciones, de los otros carriles por donde circulan los autos.
                </p>
                <h3 className={s.heading}>
                  ¿Puedo ir en bicicleta por una autopista?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>
                  No. Está prohibido que circulen las bicicletas por las autopistas.
                </p>
                <h3 className={s.heading}>
                  ¿A partir de qué edad puedo ir en bicicleta por la calle?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>
                  Podés ir en bicicleta por la calle a partir de los 12 años.
                  Pero hay excepciones. Si tenés menos de 12 años podés ir con tu bici:
                </p>
                <ul className={s.featuredList}>
                  <li>
                    Por las bicisendas.
                  </li>
                  <li>
                    Por la vereda, siempre a la menor velocidad posible y respetando la prioridad de paso de los peatones.
                  </li>
                  <li>
                    Por la calle únicamente si vas con otro ciclista de 18 años o más.
                  </li>
                </ul>
                <h3 className={s.heading}>
                  ¿Cómo tiene que estar equipada mi bicicleta para poder circular?
                  <span></span>
                </h3>
                <ul className={s.featuredList}>
                  <li>
                    Sistema de rodamiento, dirección y freno.
                  </li>
                  <li>
                    Guardabarros sobre ambas ruedas.
                  </li>
                  <li>
                    Luces, y señalización reflectiva en pedales y ruedas para que pueda detectarse durante la noche.
                  </li>
                </ul>
                <h3 className={s.heading}>
                  ¿Cuántas personas puedo llevar en mi bici?
                  <span></span>
                </h3>
                <p style={{ color: "black" }}>
                  Ninguna. No se puede llevar acompañante. Salvo que:
                </p>
                <ul className={s.featuredList}>
                  <li>
                    Se trate de una niña o niño ubicado en un asiento especial siempre que su peso te permita maniobrar y no perder estabilidad.
                  </li>
                  <li>
                    Se trate de una bicicleta que tenga más de un asiento (tándem).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

