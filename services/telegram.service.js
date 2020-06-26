const axios = require('axios');

require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GROUP_CHAT_ID = process.env.GROUP_CHAT_ID;
const TELEGRAM_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const sendMessage = (msg) => {
    const URL = `${TELEGRAM_BASE_URL}/sendMessage?chat_id=${GROUP_CHAT_ID}&text=${msg}`;
    console.log(URL);
    return axios.get(URL);
}

module.exports = {
    sendMessage
}