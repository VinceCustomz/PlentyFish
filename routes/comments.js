const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/fishes/:id/comments', commentsCtrl.create);
// router.delete('/fishes/:id/comments/:commentId', commentsCtrl.delete)

module.exports = router;