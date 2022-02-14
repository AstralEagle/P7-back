const express = require('express');
const router = express.Router();
const verifInput = require('../midleware/verifInput')
const control = require("../controleurs/user");


router.post('/signup',verifInput,control.signup);
router.post('/login',verifInput,verifInput,control.login);
router.get('/:id', control.getUser);
router.delete('/:id',verifInput);
router.put('/:id')

module.exports = router;

