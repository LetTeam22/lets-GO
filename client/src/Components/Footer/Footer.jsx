import React from 'react';
import s from './Footer.module.css';
import { BsFacebook, BsInstagram, BsWhatsapp, BsGithub } from 'react-icons/bs';

const Footer = () => {


    return (
        <div className={s.footer}>
            <div className={s.services}>
                <h5>SERVICIO AL CLIENTE</h5>
                <span className={s.footerSpan}>Preguntas Frecuentes</span>
                <span className={s.footerSpan}>Como Comprar</span>
                <span className={s.footerSpan}>Pagos y Retiros</span>
                <span className={s.footerSpan}>Legales-Promociones</span>
                <span className={s.footerSpan}>Arrepentimiento de Compra</span>
            </div>
            <div className={s.guia}>
                <h5>GUIA LET'S GO</h5>
                <span className={s.footerSpan}>Bicicleta: definición y significado</span>
                <span className={s.footerSpan}>Historia bicicleta</span>
                <span className={s.footerSpan}>Como funciona una bicicleta electrica</span>
                <span className={s.footerSpan}>Invencion de la bici</span>
                <span className={s.footerSpan}>Normativa bicicletas</span>
            </div>
            <div className={s.company}>
                <h5>COMPAÑIA</h5>
                <span className={s.footerSpan}>Sobre nosotros</span>
                <span className={s.footerSpan}>Contacto</span>
                <div className={s.icons} >
                    <BsFacebook
                        color='white'  
                        size='1.5rem' 
                        onMouseOver={({target})=>target.style.color="#F9B621"}
                        onMouseOut={({target})=>target.style.color="white"} 
                        cursor='pointer' 
                    />
                    <BsInstagram 
                        color='white'  
                        size='1.5rem'
                        onMouseOver={({target})=>target.style.color="#F9B621"}
                        onMouseOut={({target})=>target.style.color="white"} 
                        cursor='pointer'
                    />
                    <BsWhatsapp 
                        color='white'  
                        size='1.5rem'
                        onMouseOver={({target})=>target.style.color="#F9B621"}
                        onMouseOut={({target})=>target.style.color="white"} 
                        cursor='pointer'
                    />                
                    <BsGithub 
                        color='white'  
                        size='1.5rem'
                        onMouseOver={({target})=>target.style.color="#F9B621"}
                        onMouseOut={({target})=>target.style.color="white"} 
                        cursor='pointer'  
                    />                
                </div>
            </div>
        </div>
    )
}

export default Footer;