import React, { useEffect } from 'react'
import { useMercadopago } from 'react-sdk-mercadopago';
import './MercadoPago.css';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY_MP;

const Mp = ( {preference, mpInfo} ) => {

    const mercadopago = useMercadopago.v2(PUBLIC_KEY, {
        locale: 'es-AR'
    });


    useEffect(() => {
        const container = document.querySelector('.cho-container');
        const btn = document.querySelector('.mercadopago-button');

        if (mercadopago) {
            if(btn)  {
                container.removeChild(btn)
            }
            mercadopago.checkout({
                preference: {
                    id: mpInfo.id
                },
                render: {
                    container: '.cho-container',
                    label: 'RESERVAR',
                }
            })
        }
    }, [mercadopago, mpInfo]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='cho-container' />
    )
}


export default Mp;
