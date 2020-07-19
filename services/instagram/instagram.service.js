const { getIgClient } = require("./client");
const fs = require('fs');

const uploadPhotoToInstagram =  (postObject) => {
    return new Promise(async(resolve, reject) => {
        const { ig } = await getIgClient();

        const caption = postObject.caption;
        const path = postObject.path;

        const publishResult = await ig.publish.photo({
            file: fs.readFileSync(path),
            caption: caption,
        });

        if(publishResult.status === 'ok'){
            console.log("Posted to instagram");
            resolve();
        }else{
            console.log("There was a problem uploading the photo!", postObject);
            reject();
        }
    })
}

module.exports = {
    uploadPhotoToInstagram
}