const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');
const { ACCESS_TOKEN } = process.env;
const { Order, User } = require('../db');

mercadopago.configure({
    access_token: ACCESS_TOKEN
});

let id_compra = 1;

//Generamos la url de MP
router.get('/', (req, res, next) => {

    const { totalPrice, userId } = req.query;
    const user = User.findByPk(userId)
        .then(() => {
            const newOrder = Order.build({ external_reference: id_compra++ })
            return newOrder;
        })
        .catch(err => console.log(err))

    let preference = {
        items: [{
            title: 'Reserva',
            unit_price: parseInt(totalPrice, 10),
            quantity: 1
        }],
        external_reference: `${id_compra++}`,
        payment_methods: {
            excluded_payment_types: [{ id: 'atm' }],
            installments: 1
        },
        back_urls: {
            success: 'http://localhost:3001/mercadopago/pagos',
            failure: 'http://localhost:3001/mercadopago/pagos',
            pending: 'http://localhost:3001/mercadopago/pagos',
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

// Ruta que recibe la informacion del pago
router.get('/pagos', async (req, res) => {

    const { payment_id, status, external_reference, merchant_order_id } = req.query;

    try {
        // Aqui edito el status de la orden
        const newOrder = await Order.findByPk (external_reference)

        if(payment_id) newOrder.payment_id = payment_id
        if(status) newOrder.payment_status = status;
        if(merchant_order_id) newOrder.merchant_order_id = merchant_order_id;
        newOrder.status = 'completed';
        console.info('Salvando Order');
        
        try {
            await newOrder.save();
            return res.redirect('http://localhost:3000/home');
        } catch(err) {
            console.log(err);
            return res.redirect('http://localhost:3000/error');
        }

    } catch(err) {
        console.error('error al buscar', err);
        return res.redirect('http://localhost:3000/error');
    }
});



module.exports = router;