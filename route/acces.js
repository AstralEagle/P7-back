const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth')
const control = require("../controleurs/acces")


router.post('/:id',auth,control.addAccess);
router.delete('/:id',auth,control.removeAccess);



module.exports = router;