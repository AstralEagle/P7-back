const express = require('express');
const router = express.Router();
const verifInput = require('../midleware/verifInput');
const auth = require('../midleware/auth');

const control = require("../controleurs/post");



router.get('/',control.getMessage);
router.get('/:id',auth,control.getPostByID)
router.get('/:id/like',auth,control.getLikeByID)
router.get('/:id/comment',auth,control.getCommentByID)
router.get('/islike/:id',control.getIsLike)
router.post('/',verifInput,control.postMessage);
router.delete('/:id',control.deleteMessage);
router.post('/:id/like',verifInput,control.likeMessage);
router.post('/:id/comment',control.commentMessage);
router.get('/:user/',control.getMessageUser);

module.exports = router;