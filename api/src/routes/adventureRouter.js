const { Router } = require('express');
const { getAllAdventures } = require('../controllers/adventureControllers')

const router = Router();

router.get('/', getAllAdventures)

module.exports = router