const { Router } = require ('express');
const userController = require('../controllers/users');

const router = Router();

router.route('/')
    .post(userController.addNewUser);

router.route('/:id')
    .get(userController.getUserByUserName);

module.exports = router;
