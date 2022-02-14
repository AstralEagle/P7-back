const express = require('express');
const auth = require('../midleware/auth');
const verifAdmin = require('../midleware/verifOperateur');
const verifInput = require('../midleware/verifInput');
const control = require('../controleurs/report')

const router = express.Router();

router.post('/:id',verifInput,auth,control.conditionReportMessage,control.reportMessage)
router.get('/',auth,verifAdmin,control.getAllMessageAlerte)

module.exports = router;