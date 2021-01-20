const CommonClass = require('./common.js');
const GamemodeClass = require('./gamemode.js');

class Userpage {
    construct(data) {
        this.html = data["html"];
        this.raw = data["raw"];
    }
}

class UserLevel {
    construct(data) {
        this.current = data["current"];
        this.progress = data["progress"];
    }
}

class UserKudosu {
    constructor(data) {
        this.available = data["available"];
        this.total = data["total"];
    }
}

class UserRankHistoryElement {
    constructor(data) {
        this.mode = GamemodeClass.getModeFromAPIName(data["mode"]);
        this.data = data["data"];
    }
}

class UserProfileCover {
    constructor(data) {
        this.customURL = data["custom_url"];
        this.url = data["url"];
        this.id = data["id"];
    }
}

class UserProfileTournamentBanner {
    constructor(data) {
        this.id = data["id"];
        this.tournamentID = data["tournament_id"];
        this.image = data["image"];
    }
}

class UserBadge {
    constructor(data) {
        this.awardedAt = Date.parse(data["awarded_at"]);
        this.description = data["description"];
        this.imageURL = data["image_url"];
        this.url = data["url"];
    }
}

class UserAccountHistory {
    constructor(data) {
        this.id = data["id"];
        this.type = data["type"];
        this.timestamp = Date.parse(data["timestamp"]);
        this.duration = data["length"];
    }
}

class UserGradeCounts {
    construct(data) {
        this.A = data["a"];
        this.S = data["s"];
        this.SH = data["sh"];
        this.SS = data["ss"];
        this.ssh = data["ssh"];
    }
}

class UserGroup {
    construct(data) {
        this.id = data["id"];
        this.identifier = data["identifier"];
        this.isProbationary = data["is_probationary"];
        this.name = data["name"];
        this.shortName = data["short_name"];
        this.description = data["description"];
        this.colour = data["colour"];
        /* OPTIONAL ARGUMENTS START HERE */
        if ("playmodes" in data) {
            this.playmodes = [];
            data["playmodes"].forEach(function(mode) {
                this.playmodes.push(GamemodeClass.getModeFromAPIName(mode));
            });
        }
    }
}

class UserStats {
    construct(data, inUserClass = false) {
        this.gradeCounts = new UserGradeCounts(data["grade_counts"]);
        this.hitAccuracy = data["hit_accuracy"];
        this.isRanked = data["is_ranked"];
        this.level = new UserLevel(data["level"]);
        this.maximumCombo = data["maximum_combo"];
        this.playcount = data["play_count"];
        this.playtime = data["play_time"];
        this.pp = data["pp"];
        this.pp_rank = data["pp_rank"];
        this.rankedScore = data["ranked_score"];
        this.replaysWatchedCount = data["replays_watched_by_others"];
        this.totalHits = data["total_hits"];
        this.totalScore = data["total_score"];
        if (!inUserClass)
            this.user = new UserCompact(data["user"]); // Why????
    }
}

class UserCompact {
    constructor(data) {
        this.avatarURL = data["avatar_url"];
        this.countryCode = data["country_code"];
        this.defaultGroupIdentifier = data["default_group"];
        this.id = data["id"];
        this.isActive = data["is_active"];
        this.isBot = data["is_bot"];
        this.isOnline = data["is_online"];
        this.isSupporter = data["is_supporter"];
        this.lastVisit = Date.parse(data["last_visit"]);
        this.pmFriendsOnly = data["pm_friends_only"];
        this.profileColour = data["profile_colour"];
        this.name = data["username"];
        /* OPTIONAL ARGUMENTS START HERE */
        if ("account_history" in data)
            this.accountHistory = new UserAccountHistory(data["account_history"]);
        if ("active_tournament_banner" in data)
            this.activeTournamentBanner = new UserProfileTournamentBanner(data["active_tournament_banner"]);
        if ("country" in data)
            this.country = new CommonClass.Country(data["country"]);
        if ("cover" in data)
            this.cover = new UserProfileCover(data["cover"]);
        if ("page" in data)
            this.page = new Userpage(data["page"]);
        if ("statistics" in data)
            this.statistics = new UserStats(data["statistics"], true);
        if ("rank_history" in data && data["rank_history"] != null)
            this.rankHistory = new UserRankHistoryElement(data["rank_history"]);
        if ("groups" in data) {
            this.groups = [];
            data["groups"].forEach(function(group) {
                this.groups.push(new UserGroup(group));
            }, this);
        }
        if ("badges" in data) {
            this.badges = [];
            data["badges"].forEach(function(badge) {
                this.badges.push(new UserBadge(badge));
            }, this);
        }
        console.log(this);
        if ("monthly_playcounts" in data) {
            this.monthlyPlaycounts = [];
            data["monthly_playcounts"].forEach(function(value) {
                this.monthlyPlaycounts.push(new CommonClass.TimestampedCount(value));
            }, this);
        }
        if ("replays_watched_counts" in data) {
            this.replaysWatchedCounts = [];
            data["replays_watched_counts"].forEach(function(value) {
                this.replaysWatchedCounts.push(new CommonClass.TimestampedCount(value));
            }, this);
        }
        if ("user_achievments" in data) {
            this.userAchievments = [];
            data["user_achievments"].forEach(function(value) {
                this.userAchievments.push(new CommonClass.Achievment(value));
            }, this);
        }
        /* if ("user_preferences" in data) { -> Need more info, documentation provides none
            this.userPreferences = [];
            data["user_preferences"].forEach(function(value) {
                this.userPreferences.push(new UserPreferences(value));
            }, this);
        } */
        const optionalArgs = [
            ["beatmap_playcounts_count", "beatmapPlaycountsCount"], ["blocks", "blocks"],
            ["current_mode_rank", "currentModeRank"], ["favourite_beatmapset_count", "favouriteBeatmapsetCount"],
            ["follower_count", "followerCount"], ["friends", "friends"], ["graveyard_beatmapset_count", "graveyardBeatmapsetCount"],
            ["is_admin", "isAdmin"], ["is_bng", "isBNG"], ["is_full_bn", "isFullBN"], ["is_limited_bn", "isLimitedBN"],
            ["is_moderator", "isModerator"], ["is_nat", "isNAT"], ["is_restricted", "isRestricted"], ["is_silenced", "isSilenced"],
            ["loved_beatmapset_count", "lovedBeatmapsetCount"], ["previous_usernames", "previousUsernames"],
            ["ranked_and_approved_count", "rankedBeatmapsetCount"], ["scores_best_count", "scoresBestCount"],
            ["scores_first_count", "scoresFirstCount"], ["scores_recent_count", "scoresRecentCount"], ["support_level", "supportLevel"],
            ["unranked_beatmapset_count", "unrankedBeatmapsetCount"], ["unread_pm_count", "unreadPMCount"]
        ];
        optionalArgs.forEach(function(argument) {
            this[argument[1]] = data[argument[0]];
        }, this);
    }
}

class UserFull extends UserCompact {
    constructor(data) {
        super(data);
        this.discord = data["discord"];
        this.coverURL = data["cover_url"];
        this.hasSupported = data["has_supported"];
        this.interests = data["interests"];
        this.joinDate = Date.parse(data["join_date"]);
        this.kudosu = new UserKudosu(data["kudosu"]);
        this.location = data["location"];
        this.maxBlocks = data["max_blocks"];
        this.maxFriends = data["max_friends"];
        this.occupation = data["occupation"];
        this.playmode = GamemodeClass.getModeFromAPIName(data["playmode"]);
        this.playstyle = data["playstyle"];
        this.postCount = data["post_count"];
        this.profileOrder = data["profile_order"];
        this.skype = data["skype"];
        this.title = data["title"];
        this.twitter = data["twitter"];
        this.website = data["website"];
    }
}

module.exports = {
    UserCompact,
    UserFull
};
