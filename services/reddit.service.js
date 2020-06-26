const axios = require('axios');
const { insert } = require('./database.service');

const redditURL = 'https://gateway.reddit.com/desktopapi/v1/subreddits/memes?sort=top';

const getPostsFromReddit = () => {
    axios.get(redditURL)
        .then(function (response) {
            const status = response.status;
            const data = response.data;

            Object.keys(data.posts).forEach(postId => {
                if (data.posts[postId].media && !data.posts[postId].isSponsored) {
                    const mediaURL = data.posts[postId].media.content;
                    const score = data.posts[postId].score;
                    insert({
                        link: mediaURL,
                        score: score,
                        isSent: false
                    }).then((newDoc) => {
                        console.log("New link added ", newDoc);
                    }).catch((err) => {
                        console.log("There was an error", err);
                    })
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

module.exports = {
    getPostsFromReddit
}