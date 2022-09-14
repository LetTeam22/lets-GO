import React from 'react';
import s from './Footer.module.css';
import { BsFacebook, BsInstagram, BsWhatsapp, BsGithub } from 'react-icons/bs';




const github = 'https://github.com/LetTeam22/PF-Let';
const terms = '/terms'
const definition = '/definition'
const history = '/history'
const ebike = '/ebike'
const invention = '/invention'

export const Footer = () => {


    return (
        <div className={s.footer}>
            <div className={s.services}>
                <h5 className={s.h5}>SERVICIO AL CLIENTE</h5>
                <span className={s.footerSpan}>Preguntas Frecuentes</span>
                <span className={s.footerSpan}>Como Comprar</span>
                <span className={s.footerSpan}>Pagos y Retiros</span>
                <a className={s.footerSpan} href={terms} cursor='pointer'>
                    <span className={s.footerSpan}>Términos y condiciones</span>
                </a>
                <span className={s.footerSpan}>Arrepentimiento de Compra</span>
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
                <span className={s.footerSpan}>Normativa bicicletas</span>
            </div>
            <div className={s.company}>
                <h5 className={s.h5}>COMPAÑIA</h5>
                <span className={s.footerSpan}>Sobre nosotros</span>
                <span className={s.footerSpan}>Contacto</span>
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