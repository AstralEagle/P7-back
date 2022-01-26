const express = require('express');
const router = express.Router();
const control = require("../controleurs/post");


router.get('/',control.getMessage);
router.post('/',control.postMessage);
router.get('/:id',control.getMessageById);
router.delete('/:id',control.deleteMessage);
router.post('/:id/like',control.likeMessage);
router.post('/:id/comment',control.commentMessage);
router.get('/:user/',control.getMessageUser);


module.exports = router;