const {Router} = require('express');
const authenticatorController = require('../controllers/authenticator');

const router = Router();

router.route('/')
    .post(authenticatorController.processLogin);


module.exports = router;
