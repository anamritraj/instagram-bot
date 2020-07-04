const { sendMessage } = require("./telegram.service");
const {optimizeImage} = require("./optimization.service");

const handleRequest = (request) => {
    console.log("A new request arrived");

    if(!request.message.reply_to_message) return;
    const imageToBePosted = request.message.reply_to_message.text;
    let imageCaption =  "";
    if(request.message.text.split(":").length > 1 && request.message.text.split(":")[0].trim().toLowerCase() == "caption"){
        // This means there is a caption
        imageCaption = request.message.text.split(":")[1].trim();
        console.log({
            imageURL: imageToBePosted,
            caption: imageCaption
        });
        optimizeImage(imageToBePosted);
    }else{
        // This is not in specific format
        // send a message back to the group
        sendMessage("You probably forgot to send the message in a proper format.. Caption: 'Your caption'");
        return;
    }
}

module.exports = {
    handleRequest
}