import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useMercadopago } from 'react-sdk-mercadopago';
import { sendMpInfo } from '../../Redux/actions';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY_MP;

const Mp = ( {preference, datos} ) => {

    const mercadopago = useMercadopago.v2(PUBLIC_KEY, {
        locale: 'es-AR'
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (mercadopago) {
            dispatch(sendMpInfo(preference))
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
    }, [mercadopago, dispatch])

    return (
        <div>
            <div className="cho-container" />
        </div>
    )
}


export default Mp;
