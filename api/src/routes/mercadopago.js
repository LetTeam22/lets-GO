const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
    access_token: ACCESS_TOKEN
});


//Generamos la url de MP
router.get('/', (req, res, next) => {
    const id_compra = 1
    const cart = [
        { title: 'Dummy 1', quantity: 2, price: 100 },
        { title: 'Dummy 2', quantity: 1, price: 140 },
        { title: 'Dummy 1', quantity: 5, price: 20 }
    ]

    const items_ml = cart.map(i => ({
        title: i.title,
        unit_price: i.price,
        quantity: i.quantity
    }))

    let preference = {
        items: items_ml,
        external_reference: `${id_compra}`,
        payment_methods: {
            excluded_payment_types: [{ id: 'atm' }],
            installments: 1
        },
        back_urls: {
            success: 'https://localhost:3001/mercadopago/pagos',
            failure: 'https://localhost:3001/mercadopago/pagos',
            pending: 'https://localhost:3001/mercadopago/pagos'

        }
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            console.log('respondió');
            global.id = response.body.id;
            console.log(response.body);
            res.json({ id: global.id });
        })
        .catch(function (error) {
            console.log(error)
        })
})

module.exports = router;