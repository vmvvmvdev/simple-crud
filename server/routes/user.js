const express = require('express');
const router = express.Router();

const isAuthorized = require('../middlewares/isAuthorized');
const userController = require('../controllers/userController');

router.get('/', isAuthorized, userController.getUsers);
router.delete('/', isAuthorized, userController.deleteUser);
router.put('/', isAuthorized, userController.updateUser);
router.post('/',isAuthorized, userController.createUser);

module.exports = router;