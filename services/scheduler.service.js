const { getPostsFromReddit } = require('./reddit.service');
const { findOneToSendToGroup, update} = require('./database.service');
const {sendMessage} = require('./telegram.service');

const postToTelegramGroup = () => {
    findOneToSendToGroup().then(post => {
        console.log(post);
        sendMessage(post.link);
        update({link: post.link}, {
            link: post.link,
            score: -1,
            isSent: true
        }).then(() => {
            console.log("Marked as sent");
        }).catch(err => {
            console.log("There was an error in marking the post as sent: ", err);
        })

    }).catch(err => {
        console.log(err);
    })
}

const redditScheduler = (interval) => {
    setInterval(() => {
        console.log("Going to fetch posts from reddit");
        getPostsFromReddit()
    }, interval)
}

const sendToTelegramGroupScheduler = (interval) => {
    setInterval(() => {
        console.log("Going to send post to Telegram group..");
        postToTelegramGroup()
    }, interval)
}

module.exports = {
    redditScheduler,
    sendToTelegramGroupScheduler
}