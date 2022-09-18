import React, { useEffect } from 'react';
import s from './About.module.css'
// import RenderOneImage from '../Cloudinary/renderOneImage'

export const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div>
            <div className={s.left} />
            <div className={s.right} />
            <div className={s.page}>
                <section className={s.pageBlock}>
                    <div className={s.container}>
                        <div className={s.pageHeading}>
                            <h2> Quiénes somos </h2>
                        </div>

                        <h3 className={s.heading}>
                            Los "Let"
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Marzo de 2022. Dábamos nuestros primeros pasos en el mundo del desarrollo web.
                            Tímidamente durante las primeras clases y, sobretodo, en los Standups, nos fuimos acercando, creando pequeños vinculos que florecieron en grandes amistades.
                        </p>

                        <p style={{ color: "black" }}>
                            Con el paso de las clases, del tiempo y los desafíos que se presentaban día a día, fuimos creando un gran compañerismo, a base de horas y horas de trabajo. Cada uno en su casa, haciéndolo de manera individual, pero con un gran sentido de grupo y apoyo mutuo.
                        </p>

                        <p style={{ color: "black" }}>
                            Pasaron los durísimos Checkpoints, M1, M2, M3, el Proyecto Individual y después nos encontramos con la última gran prueba: el famoso e intimidante Proyecto Grupal.
                            La consigna era crear una pagina web para un e-commerce, tematica a elección. A priori, algo muy simple.
                        </p>
                        <p style={{ color: "black" }}>
                            Pero la realidad nos tenía una sorpresa...
                        </p>

                        <h3 className={s.heading}>
                            let's GO
                            <span></span>
                        </h3>

                        <p style={{ color: "black" }}>
                            Así, de la fusion de diversas ideas y misiones, nace let's GO. Ofrecemos un medio de transporte ágil, que aporte a nuestra salud física (y por qué no mental) y al cuidado del medio ambiente. Aliviana el tránsito vehicular y hace que tu viaje sea no solo un viaje, sino toda una experiencia.
                        </p>
                        <p style={{ color: "black" }}>
                            Nos ubicamos en la provincia de Tucumán, el Jardín de la República, más precisamente en su capital. Esta ciudad por su orografía nos brinda un excelente emplazamiento para disfrutar de tu Let preferida en diferentes situaciones, terrenos y exigencias.
                        </p>

                        <p style={{ color: "black" }}>
                            Por eso te ofrecemos una amplia gama de bicicletas, adaptadas para un gran rango de usos y necesidades. Desde un simple paseo por la ciudad o traslados del día a día, hasta aventuras en la montaña para los más valientes y experimentados.
                        </p>

                        <h3 className={s.heading}>
                            Tecnologías usadas
                            <span></span>
                        </h3>

                        <div>
                            <div>
                                <p style={{ color: "black" }}>Front End</p>
                                <a href="https://es.reactjs.org/" style={{ color: "black" }}>React</a> <span>  ||  </span>
                                <a href="https://es.redux.js.org/" style={{ color: "black" }}>Redux</a>
                            </div>
                            <div>
                                <p style={{ color: "black" }}>Back End</p>
                                <a href="https://nodejs.org/es/" style={{ color: "black" }}>NodeJS</a><span>  ||  </span>
                                <a href="https://expressjs.com/es/" style={{ color: "black" }}>Express</a><span>  ||  </span>
                                <a href="https://www.postgresql.org/" style={{ color: "black" }}>PostgreSQL</a><span>  ||  </span>
                                <a href="https://sequelize.org/" style={{ color: "black" }}>Sequelize</a>
                            </div>
                            <div>
                                <p style={{ color: "black" }}>Deploy</p>
                                <a href="https://vercel.com/" style={{ color: "black" }}>Vercel</a><span>  ||  </span>
                                <a href="https://www.heroku.com/" style={{ color: "black" }}>Heroku</a>
                            </div>
                            <div>
                                <p style={{ color: "black" }}>Librerías</p>
                                <a href="https://socket.io/" style={{ color: "black" }} >Socket.IO</a><span>  ||  </span>
                                <a href="https://cloudinary.com/" style={{ color: "black" }}>Cloudinary</a><span>  ||  </span>
                                <a href="https://www.npmjs.com/package/@coreui/coreui" style={{ color: "black" }}>coreui</a><span>  ||  </span>
                                <a href="https://auth0.com/" style={{ color: "black" }}>Autoh0</a><span>  ||  </span>
                                <a href="https://sweetalert.js.org/" style={{ color: "black" }}>Sweet Alert</a><span>  ||  </span>
                                <a href="https://coreui.io/" style={{ color: "black" }}>CoreUI</a><span>  ||  </span>
                                <a href="https://www.emailjs.com/" style={{ color: "black" }}>EmailJS </a><span>  ||  </span>
                                <a href="https://mui.com/" style={{ color: "black" }}>MaterialUI</a>
                            </div>

                        </div>

                        <h3 className={s.heading}>
                            Integrantes
                            <span></span>
                        </h3>
                        <div className={s.space}>
                            <div className={s.each}>
                                <p style={{ color: "black" }}>Nicolás Balbi</p>
                                <a href="https://www.linkedin.com/in/nicol%C3%A1s-balbi-263373b4/" >
                                    <img src="https://avatars.githubusercontent.com/u/78773506?v=4" className={s.circleImg} alt="Nicolás Balbi" />
                                </a>
                            </div>
                            <div className={s.each}>
                                <a href="https://www.linkedin.com/in/sole-dato-ok/" >
                                    <p style={{ color: "black" }}>Soledad Dato</p>
                                    <img src="https://avatars.githubusercontent.com/u/89033815?v=4" className={s.circleImg} alt="Soledad Dato" />
                                </a>
                            </div>
                            <div className={s.each}>
                                <a href="https://www.linkedin.com/in/felipe-jure/">
                                    <p style={{ color: "black" }}>Felipe Jure</p>
                                    <img src="https://avatars.githubusercontent.com/u/94187041?v=4" className={s.circleImg} alt="Felipe Jure" />

                                </a>
                            </div>
                            <div className={s.each}>
                                <a href="https://www.linkedin.com/in/lucia-meyer-65633a143/" >
                                    <p style={{ color: "black" }}>Lucía Meyer</p>
                                    <img src="https://avatars.githubusercontent.com/u/97004970?v=4" className={s.circleImg} alt="Lucía Meyer" />
                                </a>
                            </div>
                        </div>
                        <div className={s.space1}>
                            <div className={s.each}>
                                <a href="https://www.linkedin.com/in/leandro-pappalardo/" >
                                    <p style={{ color: "black" }}>Leandro Pappalardo</p>
                                    <img src="https://avatars.githubusercontent.com/u/94720565?v=4" className={s.circleImg} alt="Leandro Pappalardo" />
                                </a>
                            </div>
                            <div className={s.each}>
                                <p style={{ color: "black" }}>Juan Martín Silva</p>
                                <a href="https://www.linkedin.com/in/juan-martin-silva-0b981a191/" >
                                    <img src="https://avatars.githubusercontent.com/u/97624280?v=4" className={s.circleImg} alt="Juan Martín Silva" />
                                </a>
                            </div>
                            <div className={s.each}>
                                <p style={{ color: "black" }}>Máximo Tovar</p>
                                <a href="https://www.linkedin.com/in/mrtovar10/">
                                    <img src="https://avatars.githubusercontent.com/u/20747050?v=4" className={s.circleImg} alt="Máximo Tovar" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )

}