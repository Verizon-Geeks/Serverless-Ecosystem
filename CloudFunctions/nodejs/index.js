const Jimp = require('jimp');

exports.imageProcessing = async function (req, res) {
    console.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.path) {
        
        console.log(req.query.path);

        await Jimp.read(req.query.path)
            .then(image => {
                return image
                    .resize(256, 256) // resize
                    .quality(60) // set JPEG quality
                    .greyscale(() => {
                        console.log('called');
                       res.send('processed');
                    }) // set greyscale// save
            })
            .catch(err => {
                reject(Error(err))
            })
    }
    else {
       res.status(400).send('Please pass a name on the query string or in the request body');
    }
};
