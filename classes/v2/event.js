const CommonClass = require('./common.js');
const BeatmapClass = require('./beatmap.js');
const GamemodeClass = require('./gamemode.js');

class EventUser {
    constructor(data) {
        this.name = data["username"];
        this.url = data["url"];
        if ("previousUsername" in data)
            this.previousUsername = data["previousUsername"];
    }
}

class EventBeatmap {
    constructor(data) {
        this.title = data["title"];
        this.url = data["url"];
    }
}

class RecentEvent {
    constructor(data) {
        this.createdAt = Date.parse(data["created_at"]);
        this.id = data["id"];
        this.type = data["type"];
        switch (this.type) {
            case 'achievment':
                this.achievment = new CommonClass.Achievment(data["achievment"]);
                this.user = new EventUser(data["user"]);
                break;
            case 'beatmapPlaycount':
                this.beatmap = new EventBeatmap(data["beatmap"]);
                this.count = data["count"];
                break;
            case 'beatmapsetApprove':
                this.approval = BeatmapClass.getRankStatusFromAPIName(data["approval"]);
                this.beatmapset = new EventBeatmap(data["beatmapset"]);
                this.creator = new EventUser(data["user"]);
                break;
            case 'beatmapsetDelete':
                this.beatmapset = new EventBeatmap(data["beatmapset"]);
                break;
            case 'beatmapsetRevive':
                this.beatmapset = new EventBeatmap(data["beatmapset"]);
                this.creator = new EventUser(data["user"]);
                break;
            case 'beatmapsetUpdate':
                this.beatmapset = new EventBeatmap(data["beatmapset"]);
                this.creator = new EventUser(data["user"]);
                break;
            case 'rank':
                this.scoreRank = data['scoreRank'];
                this.rank = data['rank'];
                this.mode = GamemodeClass.getModeFromAPIName(data['mode']);
                this.beatmap = new EventBeatmap(data["beatmap"]);
                this.user = new EventUser(data["user"]);
                break;
            case 'rankLost':
                this.mode = GamemodeClass.getModeFromAPIName(data['mode']);
                this.beatmap = new EventBeatmap(data["beatmap"]);
                this.user = new EventUser(data["user"]);
                break;
            case 'userSupportAgain':
                this.user = new EventUser(data["user"]);
                break;
            case 'userSupportFirst':
                this.user = new EventUser(data["user"]);
                break;
            case 'userSupportGift':
                this.user = new EventUser(data["user"]);
                break;
            case 'usernameChange':
                this.user = new EventUser(data["user"]);
                break;
        }
    }
}

module.exports = {
    RecentEvent
};
