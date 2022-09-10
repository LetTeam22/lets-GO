import React, { useEffect } from 'react'
import { useMercadopago } from 'react-sdk-mercadopago';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY_MP;

const Mp = ( {preference, datos} ) => {

    const mercadopago = useMercadopago.v2(PUBLIC_KEY, {
        locale: 'es-AR'
    });

    useEffect(() => {
        if (mercadopago) {
            mercadopago.checkout({
                preference: {
                    id: datos.id
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar',
                }
            })
        }
    }, [mercadopago]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="cho-container" />
        </div>
    )
}


export default Mp;
