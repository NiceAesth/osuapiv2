const RankStatus = {
    RANKED: {
        ID: 1,
        API_NAME: "ranked"
    },
    APPROVED: {
        ID: 2,
        API_NAME: "approved"
    },
    QUALIFIED: {
        ID: 3,
        API_NAME: "qualified"
    },
    LOVED: {
        ID: 4,
        API_NAME: "loved"
    },
    PENDING: {
        ID: 0,
        API_NAME: "pending"
    },
    WIP: {
        ID: -1,
        API_NAME: "wip"
    },
    GRAVEYARD: {
        ID: -2,
        API_NAME: "graveyard"
    }
}

function getRankStatusFromID(queryID) {
    for (let status in RankStatus) {
        if (RankStatus[status].ID == queryID)
            return RankStatus[status];
    }
    return RankStatus.GRAVEYARD;
}

function getRankStatusFromAPIName(queryAPIName) {
    for (let status in RankStatus) {
        if (RankStatus[status].API_NAME == queryAPIName)
            return RankStatus[status];
    }
    return RankStatus.STANDARD;
}

module.exports = {
    RankStatus,
    getRankStatusFromID,
    getRankStatusFromAPIName
};