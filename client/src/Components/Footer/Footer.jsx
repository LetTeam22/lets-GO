import React from 'react';
import s from './Footer.module.css';
import { BsFacebook, BsInstagram, BsGithub } from 'react-icons/bs';



const github = 'https://github.com/LetTeam22/PF-Let';
const terms = '/terms'
const definition = '/definition'
const history = '/history'
const ebike = '/ebike'
const invention = '/invention'
const howToRent = 'https://res.cloudinary.com/pflet/video/upload/v1663353793/samples/YERKA_Bikes_l_2017_Promo_mubeix.mp4'
const contact = '/contact'
const faqs = '/faqs'
const normative = '/normative'
const policies = '/policies'
const payments = '/payments'
const about = '/about'
const instagram = "https://www.instagram.com/letsgo_bicis/?igshid=YmMyMTA2M2Y%3D"
const facebook = "https://www.facebook.com/Lets-GO-102754839265301"


export const Footer = () => {


    return (
        <div className={s.footer}>
            <div className={s.services}>
                <h5 className={s.h5}>SERVICIO AL CLIENTE</h5>
                <a className={s.footerSpan} href={faqs} cursor='pointer'>
                    <span className={s.footerSpan}>Preguntas frecuentes</span>
                </a>
                <a href={howToRent} className={s.footerSpan} cursor='pointer' target="_blank" rel="noopener noreferrer">
                    <span className={s.footerSpan}>Cómo alquilar</span>
                </a>
                <a href={payments} className={s.footerSpan} cursor='pointer'>
                    <span className={s.footerSpan}>Pagos y retiros</span>
                </a>
                <a className={s.footerSpan} href={terms} cursor='pointer'>
                    <span className={s.footerSpan}>Términos y condiciones</span>
                </a>
                <a href={policies} className={s.footerSpan} cursor='pointer'>
                    <span className={s.footerSpan}>Política de privacidad</span>
                </a>
            </div>
            <div className={s.guia}>
                <h5 className={s.h5}>GUIA LET'S GO</h5>
                <a className={s.footerSpan} href={definition} cursor='pointer'>
                    <span className={s.footerSpan}>Bicicleta: definición y significado</span>
                </a>
                <a className={s.footerSpan} href={history} cursor='pointer'>
                    <span className={s.footerSpan}>Historia de la bicicleta</span>
                </a>
                <a className={s.footerSpan} href={ebike} cursor='pointer'>
                    <span className={s.footerSpan}>Cómo funciona una bicicleta eléctrica</span>
                </a>
                <a className={s.footerSpan} href={invention} cursor='pointer'>
                    <span className={s.footerSpan}>Invención de la bici</span>
                </a>
                <a href={normative} className={s.footerSpan} cursor='pointer'>
                    <span className={s.footerSpan}>Normativa sobre el uso de bicicletas</span>
                </a>
            </div>
            <div className={s.company}>
                <h5 className={s.h5}>COMPAÑÍA</h5>
                <a className={s.footerSpan} href={about} cursor='pointer'>
                    <span className={s.footerSpan}>Sobre nosotros</span>
                </a>
                <a className={s.footerSpan} href={contact} cursor='pointer'>
                    <span className={s.footerSpan}>Contacto</span>
                </a>
                <div className={s.icons}>
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <BsFacebook
                            color='white'
                            size='20px'
                            onMouseOver={({ target }) => target.style.color = "#F9B621"}
                            onMouseOut={({ target }) => target.style.color = "white"}
                            cursor='pointer'
                        />
                    </a>
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <BsInstagram
                            color='white'
                            size='20px'
                            onMouseOver={({ target }) => target.style.color = "#F9B621"}
                            onMouseOut={({ target }) => target.style.color = "white"}
                            cursor='pointer'
                        />
                    </a>

                    <a href={github} target="_blank" rel="noopener noreferrer">
                        <BsGithub
                            color='white'
                            size='20px'
                            onMouseOver={({ target }) => target.style.color = "#F9B621"}
                            onMouseOut={({ target }) => target.style.color = "white"}
                            cursor='pointer'
                        />
                    </a>

                </div>
            </div>
        </div>
    )
};