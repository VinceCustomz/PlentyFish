const Fish = require('../models/fish');

module.exports = {
    index,
    new: newFish,
    create,
    show
}

function index(req, res) {
    Fish.find({}, function(err, fishes) {
        console.log(fishes)
        res.render('fishes/index', {title: 'All Fishes', fishes})
    })
}

function newFish(req, res) {
    res.render('fishes/new', {title: 'Add New Fish'});
}

function create(req, res) {
    const dateA = req.body.dateCaught
    const dateB = dateA.substring(0, Math.min(dateA.length, 16))
    req.body.dateCaught = dateB

    console.log(req.body)
    const fish = new Fish(req.body);

    fish.save(function(err) {
        if (err) {
            console.log(err)
            return res.render('fishes/new');
        }
        console.log(fish)
        res.redirect('/fishes/new')
    })
}

function show(req, res) {
    Fish.findById(req.params.id, function(err, fish) {
        console.log(fish.id)
        res.render('fishes/show', {title: 'Current Fish Details', fish})
    })
}