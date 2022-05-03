var express = require('express');
var router = express.Router();

let fishesCtrl = require ('../controllers/fishes')
let uploadCtrl = require ('../controllers/upload')

/* GET users listing. */
router.get('/', fishesCtrl.index)
router.get('/new', fishesCtrl.new)
router.get('/:id', fishesCtrl.show)
router.post('/', fishesCtrl.create)
router.delete('/:id', fishesCtrl.delete)
router.get('/:id/edit', fishesCtrl.edit)
router.put('/:id', fishesCtrl.update)

router.post('/upload', uploadCtrl.upload)
module.exports = router;
