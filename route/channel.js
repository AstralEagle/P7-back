const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth')
const verifAcces = require('../midleware/verifAcces')
const control = require("../controleurs/channel");


router.get('/',auth,control.getAllChannels);
router.get('/:id',auth,verifAcces, control.getChannelByID);
router.post('/',auth,control.createChannel);
router.delete('/:id',auth,verifAcces,control.removeChannel)


module.exports = router;