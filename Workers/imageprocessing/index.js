addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

import Jimp from './jimp.min.js';

async function handleRequest(request) {

  console.log(request.headers.get('path'));

  if(request.headers.get('path')){

      const response = await fetch(request.headers.get('path'));
      
      const pic = await response.arrayBuffer();
    
      await Jimp.read(pic)
              .then(image => {
                return image
                        .resize(256, 256)
                        .quality(60)
                        .greyscale(() => {
                          console.log('called');
                        })
              })
              .catch(err => {
                console.log(err);
              })
    
    return new Response('Processed',{headers: {
      'content-type': 'text/html;charset=UTF-8',
    }})
  
  }else{
    return new Response('No Vaild Path headers',{headers: {
      'content-type': 'text/html;charset=UTF-8',
    }, status: 500 })
  }
}
