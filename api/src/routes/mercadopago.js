const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');
const { ACCESS_TOKEN, BACK_URL, FRONT_URL } = process.env;
const { Order, User } = require('../db');

mercadopago.configure({
    access_token: ACCESS_TOKEN
});

let id_compra = 1;

//Generamos la url de MP
router.get('/', async (req, res, next) => {
    const { totalPrice, email } = req.query;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
    
        if (user.idUser && totalPrice) {
            let preference = {
                items: [{
                    title: 'Reserva',
                    unit_price: parseInt(totalPrice, 10),
                    quantity: 1
                }],
                external_reference: `${id_compra++}`,
                payment_methods: {
                    excluded_payment_types: [{ id: 'atm' }],
                    installments: 6
                },
                back_urls: {
                    success: `${BACK_URL}/mercadopago/pagos/${user.idUser}`,
                    failure: `${BACK_URL}/mercadopago/pagos`,
                    pending: `${BACK_URL}/mercadopago/pagos`,
                }
            }
    
            mercadopago.preferences.create(preference)
                .then(function (response) {
                    global.id = response.body.id;
                    res.json({ id: global.id });
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        
    } catch (error) {
        console.log(error)
    }
    
})

// Ruta que recibe la informacion del pago
router.get('/pagos/:id', async (req, res) => {

    const { payment_id, status, external_reference, merchant_order_id } = req.query;
    const { id } = req.params;

    try {
        const user = await User.findByPk(Number(id));

        // Aqui edito el status de la orden
        const newOrder = await Order.create({ external_reference })

        if (payment_id) newOrder.payment_id = payment_id
        if (status) newOrder.payment_status = status;
        if (merchant_order_id) newOrder.merchant_order_id = merchant_order_id;
        newOrder.status = 'completed';

        try {
            await user.addOrders(newOrder);
            await newOrder.save();
            return res.redirect(`${FRONT_URL}/checkout`);
        } catch (err) {
            console.log(err);
            return res.redirect(`${FRONT_URL}/error`);
        }

    } catch (err) {
        console.error('error al buscar', err);
        return res.redirect(`${FRONT_URL}/error`);
    }
});



module.exports = router;