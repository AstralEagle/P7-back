const express = require('express');
const router = express.Router();

const auth = require('../midleware/auth');
const authAdmin = require('../midleware/verifOperateur')
const verifAcces = require('../midleware/verifAcces');
const verifInput = require('../midleware/verifInput');
const multer = require('../midleware/multer');

const control = require("../controleurs/admin");

//Get Report
router.get('/message/:id',auth,authAdmin,control.getAllMessageAlerte)
router.get('/post/:id',auth,authAdmin,control.getAllPostAlerte)
router.get('/comment/:id',auth,authAdmin,control.getAllCommentAlerte)

//Delete 
router.delete('/message/:id',auth,authAdmin,control.dorceDeleteMessage)
router.delete('/post/:id',auth,authAdmin,control.dorceDeletePost)
router.delete('/comment/:id',auth,authAdmin,control.dorceDeleteComment)



module.exports = router;
