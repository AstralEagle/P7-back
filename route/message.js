const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth');
const verifAcces = require('../midleware/verifAcces');
const verifInput = require('../midleware/verifInput');
const multer = require('../midleware/multer');
const control = require("../controleurs/message");


router.get('/:id/channel',auth,verifAcces,control.getAllMessages);
router.get('/:id',auth,control.getMessage);
router.post('/:id',verifInput,auth,verifAcces,multer,control.createMessage);
router.delete('/:id',verifInput,auth,control.deleteMessage);


module.exports = router;
