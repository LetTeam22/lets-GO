import React, { useEffect } from "react";
import s from './PrivacyPolicies.module.css'


export const PrivacyPolicies = () => {

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
                            <h2>Política de privacidad</h2>
                        </div>
                        <div className={s.row}>
                            <div className={s.column}>
                                <p style={{ color: "black" }}>
                                    El propósito de esta Política de Privacidad es informarle sobre cómo procesamos sus datos personales, lo cual para nosotros es esencial. Somos transparentes sobre lo que hacemos con ellos, para ayudarlo a comprender las implicaciones de la forma en que usamos sus datos y los derechos que le corresponden en relación con los mismos:
                                </p>
                                <ul className={s.featuredList}>
                                    <li>
                                        Ponemos a su disposición permanentemente toda la información incluida en esta Política de Privacidad, que podrá consultar cuando considere oportuno.
                                    </li>
                                    <li>
                                        Encontrará más información sobre cómo usamos sus datos cuando interactúa con nosotros.
                                    </li>
                                </ul>
                                <p style={{ color: "black" }}>
                                    Cuando hablamos de nuestra Plataforma, nos referimos, en general, a cualquiera de los canales o medios, digitales o presenciales, que hayas utilizado para interactuar con nosotros. Los principales son nuestro sitio web; por teléfono o correo electrónico, por medio de nuestras redes sociales (Instagram, Facebook, etcétera).
                                </p>
                                <h3 className={s.heading}>
                                    ¿Qué datos personales recopilamos?
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Los datos personales son cualquier información que se relacione con una persona física identificada o identificable. Los datos personales que nos proporcione a través de nuestro sitio web y nuestros servicios se entenderán entregados con consentimiento exprés desde el momento en que Ud. mismo es quien los proporciona. En particular:
                                </p>
                                <ul className={s.featuredList}>
                                    <li>
                                        Cuando te registrás para una cuenta de let's GO, recopilamos las credenciales de inicio de sesión de tu cuenta.
                                    </li>
                                    <li>
                                        Cuando completás nuestro formulario en línea para ponerte en contacto con nuestro equipo, recopilamos tu correo electrónico y cualquier otra información que elijás incluir en el cuerpo de tu correo electrónico, mensaje o respuestas.
                                    </li>
                                    <li>
                                        Cuando utilicés los servicios ofrecidos por Kleta, como una suscripción para el uso de una bicicleta y realice pagos, recibiremos la información de su transacción. La información financiera que recopilamos incluirá información sobre el método de pago elegido (como tarjeta de crédito o débito), el monto de la compra y la fecha de compra.
                                    </li>
                                    <li>
                                        Si sos usuario de let's GO, proporcionarás tus datos de contacto, como nombre completo, número de teléfono y dirección de correo electrónico. Como parte de tu relación comercial con nosotros, también podemos recibir información personal sobre vos, como tu Documento Nacional de Identidad, fecha de nacimiento y datos de ubicación para el servicio de recogida.
                                    </li>
                                    <li>
                                        Si te comunicás con nosotros a través de nuestras cuentas de redes sociales o compartís, "me gusteás" y nos sigue ahí, recopilamos tu información (nombre de usuario e información adicional) con fines de marketing.
                                    </li>
                                </ul>
                                <h3 className={s.heading}>
                                    ¿¿Cómo utilizamos tus datos personales?
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Nos basamos en una serie de fundamentos legales para garantizar que el uso que hacemos de sus datos personales cumpla con la ley aplicable. Usamos tus datos personales para facilitar las relaciones comerciales que tenemos con nuestros usuarios, para cumplir con nuestras obligaciones regulatorias financieras y otras obligaciones legales, y para perseguir nuestros intereses comerciales legítimos. También utilizamos tus datos personales para completar transacciones de pago y para proporcionar servicios relacionados con el pago a nuestros usuarios.
                                </p>
                                <ul className={s.featuredList}>
                                    <li>
                                        Intereses comerciales legítimos: confiamos en nuestros intereses comerciales legítimos para procesar tus datos personales. La siguiente lista establece los fines comerciales que hemos identificado como legítimos. Al determinar el contenido de esta lista, equilibramos nuestros intereses con los intereses y derechos legítimos de las personas cuyos datos personales procesamos: a) Monitoreamos, prevenimos y detectamos el fraude y las transacciones de pago no autorizadas; b) mitigamos pérdidas financieras, reclamaciones, responsabilidades u otros daños a los usuarios y let's GO; c) respondemos a consultas, d) enviamos avisos de servicio y brindamos soporte al cliente; e) promovemos, analizamos, modificamos y mejoramos nuestros productos, sistemas y herramientas y desarrollamos nuevos productos y servicios; f) analizamos y publicitamos nuestros productos y servicios y compartimos datos personales con proveedores de servicios externos que brindan servicios en nuestro nombre y socios comerciales para ayudar a operar y mejorar nuestro negocio.
                                    </li>
                                </ul>
                                <h3 className={s.heading}>
                                    Comunicaciones de marketing y eventos
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Dependemos de vos para enviarte comunicaciones de marketing por correo electrónico sobre los productos y servicios de let's GO, invitarte a participar en nuestros eventos o encuestas, o comunicarnos con vos con fines de marketing, siempre que lo hagamos de acuerdo con los requisitos de consentimiento expreso impuestos por la normativa aplicable. Por ejemplo, cuando recopilamos tus datos de contacto personales y/o comerciales a través de nuestra participación en eventos, podemos utilizar la información para realizarte un seguimiento en relación con nuestro negocio, enviarte información que hayas solicitado sobre nuestros productos y servicios y, con tu permiso, incluirte en nuestras campañas de información de marketing.
                                </p>

                                <h3 className={s.heading}>
                                    Publicidad
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Cuando visitás nuestro sitio web, podemos utilizar tus datos personales recopilados para enviarte anuncios de los servicios de let's GO. Por ejemplo, cuando visités nuestro sitio web, utilizaremos cookies para identificar su dispositivo y enviarle anuncios de nuestros servicios.
                                    No utilizamos, compartimos, alquilamos ni vendemos los datos personales de nuestros usuarios para publicidad.
                                </p>
                                <h3 className={s.heading}>
                                    Uso por menores
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Los servicios no están dirigidos a personas menores de dieciocho (18) años.
                                    Recomendamos a los padres que participen en las actividades online de sus hijos para evitar que let's GO procese involuntariamente tus datos personales.
                                </p>
                                <h3 className={s.heading}>
                                    Seguridad y retención
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Hacemos esfuerzos razonables para garantizar un nivel de seguridad apropiado al riesgo asociado con el procesamiento de datos personales. Mantenemos medidas organizativas, técnicas y administrativas diseñadas para proteger los datos personales dentro de nuestra empresa contra el acceso no autorizado, destrucción, pérdida, alteración o mal uso. Desafortunadamente, no se puede garantizar que ningún sistema de transmisión o almacenamiento de datos sea 100% seguro. Si tenés motivos para creer que tu interacción con nosotros ya no es segura, comunicate con nosotros de inmediato.
                                </p>
                                <p style={{ color: "black" }}>
                                    Conservamos tus datos personales durante el tiempo que sea necesario o permitido dentro de las limitaciones de los fines enumerados en esta Política de Privacidad y de acuerdo con la legislación aplicable. Los criterios utilizados para determinar este período de almacenamiento incluyen:
                                </p>
                                <ul className={s.featuredList}>
                                    <li>
                                        La duración del período en el que tenemos una relación actual con vos y te brindamos servicios (por ejemplo, siempre que tengás una cuenta con nosotros o continués utilizando nuestros servicios).
                                    </li>
                                    <li>
                                        Si estamos sujetos a una obligación legal, como leyes especiales que nos exigen almacenar nuestras transacciones durante un período específico antes de eliminarlas.
                                    </li>
                                    <li>
                                        Si el almacenamiento es deseable debido a nuestra posición legal con respecto a cuestiones tales como plazos de vencimiento, disputas o investigaciones por parte de las fuerzas del orden.
                                    </li>
                                </ul>
                                <p style={{ color: "black" }}>
                                    No obstante lo anterior conservaremos tus datos personales después de que dejemos de brindarte servicios, directa o indirectamente, en la medida necesaria para cumplir con nuestras obligaciones legales y reglamentarias. Si nos enviás correspondencia, incluidos correos electrónicos, conservamos dicha información de forma electrónica para medir y mejorar nuestro servicio al cliente e investigar posibles fraudes y violaciones. Es posible que, con el tiempo, eliminemos estos registros según lo permita la ley.
                                </p>
                                <p style={{ color: "black" }}>
                                    Por último, también conservaremos los datos de uso del sitio web y los servicios para fines de análisis internos. Los datos de uso generalmente se conservan por un período de tiempo más corto, excepto cuando estos datos se usan para fortalecer la seguridad o para mejorar la funcionalidad de nuestro sitio web, o estamos legalmente obligados a retener esos datos por períodos más largos.
                                </p>
                                <h3 className={s.heading}>
                                    Tus derechos y elecciones
                                    <span></span>
                                </h3>
                                <p style={{ color: "black" }}>
                                    Tenés opciones con respecto a nuestro uso de tus datos personales:
                                </p>
                                <ul className={s.featuredList}>
                                    <li>
                                        Optar por no recibir nuestras comunicaciones electrónicas: si ya no deseás recibir nuestros correos electrónicos relacionados con marketing, podés optar por no recibirlos a través del enlace de cancelación de suscripción incluido en dichos correos electrónicos. Intentaremos cumplir con tu solicitud tan pronto como sea razonablemente posible. Tené en cuenta que, si optás por no recibir nuestros correos electrónicos relacionados con el marketing, es posible que aún te enviemos mensajes administrativos importantes que se requieren para brindarte nuestros servicios.
                                    </li>
                                    <li>
                                        Si deseás revisar, corregir o actualizar los datos personales que nos ha facilitado anteriormente, podés hacerlo iniciando sesión en tu cuenta de let's GO o comunicándote con nosotros.
                                    </li>
                                    <li>
                                        Tus derechos de protección de datos: tenés derecho a saber cuáles de tus datos personales tratamos y a quién se los hemos proporcionado. Si otorgaste permiso para el procesamiento de tus datos personales, también tenés derecho a revocar ese permiso.
                                    </li>
                                    <li>
                                        Si deseás ver, corregir, editar, limitar, eliminar cualquiera de sus datos personales procesados ​​por nosotros u oponerte al procesamiento de tus datos personales o actividades de marketing directo, o si deseás recibir una copia electrónica de tus datos personales, no dudés en ponerte en contacto con let's GO. Describí con la mayor claridad posible a qué datos personales se refiere tu solicitud. Te responderemos a la mayor brevedad posible y no más tarde del plazo de respuesta legalmente estipulado.
                                    </li>
                                </ul>
                                <p style={{ color: "black" }}>
                                    Para asegurarnos de que fuiste vos quien envió la solicitud, es posible que te pidamos que incluyas una prueba de su identificación junto con tu solicitud. Sólo te preguntaremos esto si es necesario para identificarte, y te pedimos que también hagás ilegibles la foto del DNI.
                                    Destruiremos la copia de tu prueba de identificación inmediatamente después de haber determinado su identidad.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

