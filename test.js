require('dotenv').config()
const osuAPI = require('./api/oauth.js');
const GamemodeClass = require('./classes/v2/gamemode.js');

async function test() {
    config = {
        "clientID": process.env.CLIENT_ID,
        "clientSecret": process.env.CLIENT_SECRET,
        "token": process.env.TOKEN
    }
    api = await osuAPI.asGuest(config);
    data = await api.getUserRecentActivity(8185118);
    console.log(data);
};

test();