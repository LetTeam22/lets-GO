import React from 'react';
import s from './Footer.module.css';
import { BsFacebook, BsInstagram, BsWhatsapp, BsGithub } from 'react-icons/bs';




const github = 'https://github.com/LetTeam22/PF-Let';
const terms = '/terms'
const definition = '/definition'
const history = '/history'
const ebike = '/ebike'
const invention = '/invention'
const howToRent = '/how'
const contact = '/contact'
const faqs = '/faqs'
const normative = '/normative'
const policies = '/policies'
const payments = '/payments'

export const Footer = () => {


    return (
        <div className={s.footer}>
            <div className={s.services}>
                <h5 className={s.h5}>SERVICIO AL CLIENTE</h5>
                <a className={s.footerSpan} href={faqs} cursor='pointer'>
                    <span className={s.footerSpan}>Preguntas Frecuentes</span>
                </a>
                <a href={howToRent} className={s.footerSpan} cursor='pointer'>
                    <span className={s.footerSpan}>Cómo alquilar</span>
                </a>
                <a href={payments} className={s.footerSpan} cursor='pointer'>
                    <span className={s.footerSpan}>Pagos y Retiros</span>
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
                    <span className={s.footerSpan}>Como funciona una bicicleta electrica</span>
                </a>
                <a className={s.footerSpan} href={invention} cursor='pointer'>
                    <span className={s.footerSpan}>Invencion de la bici</span>
                </a>
                <a href={normative} className={s.footerSpan} cursor='pointer'>
                    <span className={s.footerSpan}>Normativa bicicletas</span>
                </a>
            </div>
            <div className={s.company}>
                <h5 className={s.h5}>COMPAÑIA</h5>
                <span className={s.footerSpan}>Sobre nosotros</span>
                <a className={s.footerSpan} href={contact} cursor='pointer'>
                    <span className={s.footerSpan}>Contacto</span>
                </a>
                <div className={s.icons} >

                    <BsFacebook
                        color='white'
                        size='20px'
                        onMouseOver={({ target }) => target.style.color = "#F9B621"}
                        onMouseOut={({ target }) => target.style.color = "white"}
                        cursor='pointer'
                    />

                    <BsInstagram
                        color='white'
                        size='20px'
                        onMouseOver={({ target }) => target.style.color = "#F9B621"}
                        onMouseOut={({ target }) => target.style.color = "white"}
                        cursor='pointer'
                    />

                    <BsWhatsapp
                        color='white'
                        size='20px'
                        onMouseOver={({ target }) => target.style.color = "#F9B621"}
                        onMouseOut={({ target }) => target.style.color = "white"}
                        cursor='pointer'
                    />

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