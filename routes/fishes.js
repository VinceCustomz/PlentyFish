var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer ({dest: 'uploads/'})

let fishesCtrl = require ('../controllers/fishes')
// let uploadCtrl = require ('../controllers/uploads')



/* GET users listing. */
router.get('/', fishesCtrl.index)
router.get('/new', fishesCtrl.new)
router.get('/:id', fishesCtrl.show)
// router.post('/', fishesCtrl.create)
router.post('/', upload.single('image'), fishesCtrl.create)

router.delete('/:id', fishesCtrl.delete)
router.get('/:id/edit', fishesCtrl.edit)
router.put('/:id', fishesCtrl.update)



module.exports = router;

