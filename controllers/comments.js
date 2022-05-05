const Fish = require('../models/fish');

module.exports = {
    create
}

function create(req, res) {
    Fish.findById(req.params.id, function(err, fish) {
        console.log(req.body)

        fish.comments.push(req.body)
        fish.save(function(err, savedFish) {
            console.log(savedFish)
            res.redirect(`/fishes/${req.params.id}`);
        })
    })
}


