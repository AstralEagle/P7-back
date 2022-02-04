const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth')
const verifAcces = require('../midleware/verifAcces')
const control = require("../controleurs/message");


router.get('/:id/channel',auth,verifAcces,control.getAllMessages);
router.get('/:id',auth,control.getMessage);
router.post('/:id',auth,verifAcces,control.createMessage);
router.delete('/:id',auth,control.deleteMessage);


module.exports = router;