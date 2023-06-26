const { Router } = require('express');
const { getSentimentsStats} = require('../controllers/chartControllers');

const router = Router();
router.get('/', getSentimentsStats) // /chart


module.exports = router;