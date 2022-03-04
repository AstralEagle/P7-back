const express = require('express');
const auth = require('../midleware/auth');
const verifAdmin = require('../midleware/verifOperateur');
const verifInput = require('../midleware/verifInput');
const control = require('../controleurs/report')

const router = express.Router();

router.post('/message/:id/',verifInput,auth,control.conditionReportMessage,control.reportMessage)
router.post('/post/:id')
router.get('/message',auth,verifAdmin,control.getAllMessageAlerte)

module.exports = router;