const Fish = require('../models/fish');
const request = require('request');
const fs = require('fs');
const res = require('express/lib/response');
const { rawListeners } = require('process');

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
        res.render('fishes/index', {title: 'Plenty of Fish Outside', fishes})
    })
}

function newFish(req, res) {
    res.render('fishes/new', {title: 'Add New Fish'});
}

// function create(req, res) {
//     //from here
//     const dateA = req.body.dateCaught
//     const dateB = dateA.substring(0, Math.min(dateA.length, 16))
//     req.body.dateCaught = dateB

//     console.log(req.body)
//     const fish = new Fish(req.body);

//     fish.save(function(err) {
//         if (err) {
//             console.log(err)
//             return res.render('fishes/new');
//         }
//         console.log(fish)
//         res.redirect('/fishes')
//     })
// }

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  // image we are sending in base64 format
  return bitmap.toString('base64');
}

function create(req, res, next) {
    //from here
    console.log('line 56', req.file)
    let image = base64_encode(req.file.path)

    const options = {
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: `Client-ID ${process.env.CLIENT_ID}`,
        },
        formData: {
            image: image,
            type: 'base64'
        },
    };

    request(options, function(err, response) {
        if (err) return console.log(err);
        let body = JSON.parse(response.body)
        console.log('this is line 74', body)
        req.body.uploadLink = body.data.link

        const fish = new Fish(req.body)

        fish.save(function(err) {
            fs.unlink(req.file.path, function(err) {
                if (err) {
                    console.log(err)
                    return res.render('fishes/new')
                }
                
                console.log(fish)
                if (err) return console.log(err)
                let link = body.data.link;
                res.redirect('/fishes')
            })          
        })
    })
}

function show(req, res) {
    Fish.findById(req.params.id, function(err, fish) {
        console.log(fish.id)
        res.render('fishes/show', {title: 'Fish Details', fish})
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
        res.render('fishes/edit', {title: 'Did it Taste Good?', fish})
    })
}



async function update(req, res) {
    console.log('hereeeeeeee')
    try {
        console.log(req.params.id, req.body)
        const fish = await Fish.findByIdAndUpdate(req.params.id, req.body)
        // req.params.id will find the ID of the object, then replace with whatever in req.body
        res.redirect('/fishes/'+ req.params.id)
    } catch (error) {
        res.send(error)
    }
    
}


// fish.save(function(err) {
//     fs.unlink(req.file.path, function(err) {
//         const dateA = req.body.dateCaught
//         const dateB = dateA.substring(0, Math.min(dateA.length, 16))
//         req.body.dateCaught = dateB
    
//         console.log('this is line 84', req.body)
//         const fish = new Fish(req.body);
    
//         fish.save(function(err) {
//             if (err) {
//                 console.log(err)
//                 return res.render('fishes/new');
//             }
//             console.log(fish)
//             res.redirect('/fishes')
//         })

//         if(err) return console.log(err);
//         let link = body.data.link;
//         res.redirect(`/${req.params.id}`);  //maybe redirect to '/fishes'
//     })
// })