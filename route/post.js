const express = require('express');
const router = express.Router();
const verifInput = require('../midleware/verifInput');
const auth = require('../midleware/auth');

const control = require("../controleurs/post");



router.get('/',auth,control.getMessage);
router.get('/:id',auth,control.getPostByID)
router.post('/',auth,verifInput,control.postMessage);
router.delete('/:id',auth,control.verifUserPost,control.deleteMessage);
router.post('/:id/like',auth,verifInput,control.likeMessage);
router.post('/:id/report',auth,control.reportPostByID)

router.get('/comment/:id',auth,control.getAllCommentsByID);
router.post('/:id/comment',auth,control.commentMessage);
router.delete('/comment/:id',auth,control.verifAccesComment,control.deleteComment);



module.exports = router;  
