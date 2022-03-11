const express = require('express');
const auth = require('../midleware/auth');
const verifAdmin = require('../midleware/verifOperateur');
const verifInput = require('../midleware/verifInput');
const control = require('../controleurs/report')

const router = express.Router();

router.post('/message/:id/',verifInput,auth,control.conditionReportMessage,control.reportMessage)
router.post('/post/:id',verifInput,auth,control.conditionReportPost,control.reportPost)
router.post('/comment/:id',verifInput,auth,control.conditionReportComment,control.reportComment)

router.get('/message/:id',auth,verifAdmin,control.getAllMessageAlerte)
router.get('/post/:id',auth,verifAdmin,control.getAllPostAlerte)
router.get('/comment/:id',auth,verifAdmin,control.getAllCommentAlerte)

module.exports = router;
