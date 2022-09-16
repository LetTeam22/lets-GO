import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import { useMercadopago } from 'react-sdk-mercadopago';
import swal from 'sweetalert';
import './MercadoPago.css';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY_MP;

const Mp = ( {preference, mpInfo} ) => {

    const { isAuthenticated } = useAuth0();

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
            if(isAuthenticated) {
                mercadopago.checkout({
                    preference: {
                        id: mpInfo.id
                    },
                    render: {
                        container: '.cho-container',
                        label: 'RESERVAR',
                    }
                })
            } else {
                swal({
                    title: 'Precaucion',
                    icon: 'info',
                    text: 'Para poder avanzar con la reserva primero deberas iniciar sesión con tu cuenta, o registrarte en caso de todavia no poseer una'
                })
            }
        }
    }, [mercadopago, mpInfo, isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='cho-container' />
    )
}


export default Mp;
