const osuAPIv2Base = require('./api.js');
const ErrorClass = require('../classes/errors.js');
const UserClass = require('../classes/v2/user.js');
const CommonClass = require('../classes/v2/common.js');
const GamemodeClass = require('../classes/v2/gamemode.js');
const EventClass = require('../classes/v2/event.js');

class osuAPIv2 extends osuAPIv2Base {
    constructor(config) {
        super();
        this.clientID = config.clientID
        this.clientSecret = config.clientSecret
        this.scope = ""
        this.token = null
        if ("token" in config)
            this.token = config.token
    }

    static public(config) {
        return new this(config);
    }

    static async asGuest(config, createGuests = false) {
        let obj = new this(config);
        obj.scope = "public";
        const tokenValid = await obj.checkToken();
        if ( !("token" in config) || !tokenValid ) {
            if (!createGuests) // We do not have a valid token to work with, and were asked not to create a token
                throw new ErrorClass.AuthenticationError();
            const token = await obj.createGuestToken();
            obj.token = token;
            return obj;
        }
        return obj;
    }

    static async withToken(config) {
        return new this(config);
    }

    async createGuestToken() {
        const url = this.baseURL + 'oauth/token';
        const options = {
            "client_id": this.clientID,
            "client_secret": this.clientSecret,
            "grant_type": "client_credentials",
            "scope": "public"
        }
        const resp = await this.requestPOST(url, options);
        return resp["access_token"];
    }

    async checkToken() {
        try {
            await this.getSpotlights();
            return true;
        } catch (error) {
            return false;
        }
    }

    async getSpotlights() {
        const url = this.baseURL + this.baseAPI + "spotlights/";
        const options = {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }
        return this.requestGET(url, options);
    }

    async getUser(ID, mode = GamemodeClass.modes.STANDARD) {
        const url = this.baseURL + this.baseAPI + "users/" + ID + '/' + mode.API_NAME;
        const options = {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }
        const resp = await this.requestGET(url, options);
        return new UserClass.UserFull(resp);
    }

    async getUserRecentActivity(ID, query = {}) {
        // Query Parameters: limit, offset
        const url = this.baseURL + this.baseAPI + "users/" + ID + '/recent_activity/';
        const options = {
            params: query,
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }
        const resp = await this.requestGET(url, options);
        let activity = [];
        resp.forEach(function(eventData) {
            activity.push(new EventClass.RecentEvent(eventData));
        });
        return activity;
    }

}

module.exports = osuAPIv2;
