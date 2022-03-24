
const express = require('express');
const router = express.Router();
const verifInput = require('../midleware/verifInput');
const auth = require('../midleware/auth')
const control = require("../controleurs/user");



router.post('/signup',verifInput,control.signup);
router.post('/login',verifInput,verifInput,control.login);
router.delete('/:id',verifInput);

router.get('/',auth,control.getMyUser)
router.get('/:id', control.getUser);
router.put('/:id',verifInput,auth,control.updateUser);
router.get('/:id/posts',auth,control.getPostByUser)
router.get('/:id/likes',auth,control.getLikeByUser)

module.exports = router;

