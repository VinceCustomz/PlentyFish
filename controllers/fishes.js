const Fish = require('../models/fish');

module.exports = {
    index,
    new: newFish,
    create,
    show,
    delete: deleteFish,
    edit,
    update
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

async function deleteFish(req, res) {
    console.log(req.params.id)
    
    const fish = await Fish.findByIdAndDelete(req.params.id)
    console.log(Fish)
    res.redirect('/fishes')
}

function edit(req, res) {
    Fish.findById(req.params.id, function(err, fish) {
        console.log(fish)
        res.render('fishes/edit', {fish})
    })
}

async function update(req, res) {
    console.log(req.params.id, req.body)
    const fish = await Fish.findByIdAndUpdate(req.params.id, req.body)
    // req.params.id will find the ID of the object, then replace with whatever in req.body
    res.redirect('/fishes/'+ req.params.id)
}
