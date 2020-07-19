const { IgApiClient } = require('instagram-private-api');

const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME;
const INSTAGRAM_PASSWORD = process.env.INSTAGRAM_PASSWORD;

const IgClient = () => {
    let ig;

    const initialize = () => {
        return new Promise(async (resolve, reject) => {
            console.log("Creating a new Instagram Client");

            ig = new IgApiClient();
            ig.state.generateDevice(INSTAGRAM_USERNAME);
            await ig.account.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD);
            resolve({ig: ig});
        })
    }

    return {
        getIgClient: () => {
            if(!ig){
                return initialize();
            }
            console.log("Reusing the previous client");

            return new Promise(resolve => {
                resolve({ig: ig});
            })
        }
    }
}

module.exports = {
    getIgClient : IgClient().getIgClient
}