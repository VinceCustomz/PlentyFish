var express = require('express');
var router = express.Router();

let fishesCtrl = require ('../controllers/fishes')

/* GET users listing. */
router.get('/', fishesCtrl.index)
router.get('/new', fishesCtrl.new);
router.get('/:id', fishesCtrl.show)
router.post('/', fishesCtrl.create)


module.exports = router;
