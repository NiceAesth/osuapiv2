const modes = {
    STANDARD: {
        ID: 0,
        API_NAME: "osu",
        FULL_NAME: "osu!standard"
    },
    TAIKO: {
        ID: 1,
        API_NAME: "taiko",
        FULL_NAME: "osu!taiko"
    },
    CTB: {
        ID: 2,
        API_NAME: "fruits",
        FULL_NAME: "osu!catch"
    },
    MANIA: {
        ID: 3,
        API_NAME: "mania",
        FULL_NAME: "osu!mania"
    }
}

function getModeFromID(queryID) {
    for (let mode in modes) {
        if (modes[mode].ID == queryID)
            return modes[mode];
    }
    return modes.STANDARD;
}

function getModeFromAPIName(queryAPIName) {
    for (let mode in modes) {
        if (modes[mode].API_NAME == queryAPIName)
            return modes[mode];
    }
    return modes.STANDARD;
}

module.exports = {
    modes,
    getModeFromID,
    getModeFromAPIName
};