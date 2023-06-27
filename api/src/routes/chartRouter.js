const { Router } = require('express');
const { getSentimentsStats, getEarnings } = require('../controllers/chartControllers');

const router = Router();
router.get('/sentiments', getSentimentsStats) // sentimientos

router.get('/earnings/:year', getEarnings) // ganancias por reservas

module.exports = router;