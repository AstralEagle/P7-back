const express = require('express');
const router = express.Router();
const control = require("../controleurs/user");
const verifInput = require('../midleware/verifInput')


router.post('/signup', control.signup);
router.post('/login',verifInput,control.login);
router.get('/:id', control.getUser);
router.delete('/:id');
router.put('/:id')

module.exports = router;

