const Jimp = require('jimp');

const MAX_AR = 1.91;
const MIN_AR = 0.8;

const optimizeImage = (url) => {
    return new Promise((resolve, reject) => {
        Jimp.read(url)
            .then(image => {
                // Check if the aspect ratio is in the limits
                const height = image.bitmap.height;
                const width = image.bitmap.width;
                // if not in the limits, add black borders
                if (width / height > MAX_AR) {
                    const newHeight = width / MAX_AR;
                    image.contain(width, newHeight);
                } else if (width / height < MIN_AR) {
                    const newWidth = height * MIN_AR;
                    image.contain(newWidth, height);
                }

                // save the file locally
                image.write('./file.jpg', (err, data) => {
                    if(err){
                        reject("Write failed");
                    }
                    console.log(data);
                    resolve();
                }); 

            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })

}

module.exports = {
    optimizeImage
}