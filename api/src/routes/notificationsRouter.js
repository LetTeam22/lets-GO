const { Router } = require('express');
const { getUserNotifications } = require('../controllers/notificationsControllers');

const router = Router();

router.get('/', getUserNotifications);


module.exports = router;