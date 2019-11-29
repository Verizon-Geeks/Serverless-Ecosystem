const Jimp = require('jimp');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.path) {
        
        console.log(req.query.path);

        await Jimp.read(req.query.path)
            .then(image => {
                return image
                    .resize(256, 256) // resize
                    .quality(60) // set JPEG quality
                    .greyscale(() => {
                        console.log('callled');
                        context.res = {
                            status: 200, /* Defaults to 200 */
                            body: "processed"
                        };
                    }) // set greyscale// save
            })
            .catch(err => {
                reject(Error(err))
            })
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
