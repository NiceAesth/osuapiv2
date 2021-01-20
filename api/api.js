const axios = require('axios').default;

// This class handles only the public API Endpoints
class osuAPIv2Base {
    constructor() {
        this.baseURL = "https://osu.ppy.sh/",
        this.baseAPI = "api/v2/"
    }

    requestGET = async(url  = "", options = {})  => {
            const resp = await axios.get(url, options);
            return resp.data;
    }

    requestPOST = async(url  = "", options = {})  => {
        try {
            const resp = await axios.post(url, options);
            return resp.data;
        } catch (error) {
            console.error(error);
        }
    }

    getMultiplayerScores() {
        // baseURL + rooms/{room}/playlist/{playlist}/scores
    }

    getMultiplayerRooms() {
        // baseURL + rooms/{mode?}
    }

    getMultiplayerRoom() {
        // baseURL + rooms/{room}
    }

    getMultiplayerLeaderboard() {
        // baseURL + rooms/{room}/leaderboard
    }

    getLeaderboard() {
        // baseURL + rankings/{mode}/{type}
    }

    getSpotlight() {
        // baseURL + spotlights
    }

    getBeatmapEvents() {
        // baseURL + beatmapsets/events
    }

    getChangelog() {
        const url = this.baseURL + this.baseAPI + "changelog/"
        return this.requestGET(url);
    }

    getBuildChangelog(streamName, buildVersion) {
        const url = this.baseURL + this.baseAPI + "changelog/" + streamName + '/' + buildVersion
        return this.requestGET(url);
    }

    getSeasonalBackground() {
        // baseURL + seasonal-backgrounds
    }
}

module.exports = osuAPIv2Base;
