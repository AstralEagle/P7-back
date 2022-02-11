const express = require('express');
const auth = require('../midleware/auth');
const adminAcces = require('../midleware/verifAdminAcces');
const control = require("../controleurs/acces");

const router = express.Router();

router.get('/:id',auth,adminAcces,control.getAllAccess);
router.post('/:id',auth,control.addAccess);
router.delete('/:id',auth,control.removeAccess);
router.delete('/force/:id',auth,adminAcces,control.forceRemoveAccess);
router.post('/op/:id',auth,adminAcces,control.addAdmin);
router.post('/deop/:id',auth,adminAcces,control.removeAdmin);


module.exports = router;

