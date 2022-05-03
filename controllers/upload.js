const request = require('request');
const fs = require('fs');
const Fish = require('../models/fish');

module.exports = {
    upload
}

function base64_encode(image) {
  // read binary data
  var bitmap = fs.readFileSync(image);
  // convert binary data to base64 encoded string
  return bitmap.toString('base64');
}

function upload(req, res, next) {
    console.log(req.files)
    let image = base64_encode(req.files.image.file);

    const options = {
        method:'POST',
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
        console.log(body)
        Fish.findById(req.params.id, function(err, fish) {
            res.render('fishes/show', {fish})
        })
    })
}