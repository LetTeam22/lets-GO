const { Router } = require('express');
const {saveContactMessage, saveContactMessageGPT, allContacts} = require ('../controllers/contactControllers')

const router = Router();

//Guarda el mensaje enviado a traves del form de contacto
// ruta: /contact/save
router.post('/save',saveContactMessage);

//Guarda el mensaje enviado a traves del form de contacto
// ruta: /contact/saveGPT
router.post('/saveGPT',saveContactMessageGPT);

// Devuelve todos los mensajes de contacto
// ruta: /contact/getall
router.get('/getall', allContacts)

module.exports = router;