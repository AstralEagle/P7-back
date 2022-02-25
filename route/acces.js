const express = require('express');
const auth = require('../midleware/auth');
const adminAcces = require('../midleware/verifAdminAcces');
const verifInput = require('../midleware/verifInput');
const control = require("../controleurs/acces");

const router = express.Router();

router.post('/:id',verifInput,auth,control.addAccess);
router.delete('/:id',verifInput,auth,control.removeAccess);
router.delete('/force/:id',auth,adminAcces,verifInput,control.forceRemoveAccess);
router.get('/:id',auth,adminAcces,control.getAllAccess);
router.post('/op/:id',auth,adminAcces,verifInput,control.addAdmin);
router.post('/deop/:id',auth,adminAcces,verifInput,control.removeAdmin);


module.exports = router;

