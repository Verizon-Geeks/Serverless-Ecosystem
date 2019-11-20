const Jimp = require('/opt/node_modules/jimp');

exports.handler = async (event) => {
    console.log('starting image processing');
    
    console.log(event);
    
    let path = event.queryStringParameters.path

    const promise = new Promise((resolve, reject) => {
        Jimp.read(path)
            .then(image => {
                return image
                    .resize(256, 256) // resize
                    .quality(60) // set JPEG quality
                    .greyscale(() => {
                        resolve({
                            statusCode: 200,
                            headers: {
                                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                            },
                            body: 'processed'
                        })
                    }) // set greyscale// save
            })
            .catch(err => {
                reject(Error(err))
            })
    })
    return promise
    
};
