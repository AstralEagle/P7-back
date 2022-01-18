const express = require('express');
const router = express.Router();
const control = require("../controleurs/user");


router.post('/signup', control.signup);
router.post('/login',control.login);
router.get('/', control.getUser);
router.delete('/:id');
router.put('/:id')


module.exports = router;