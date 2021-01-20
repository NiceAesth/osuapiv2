class TimestampedCount {
    constructor(data) {
        this.start_date = Date.parse(data["start_date"]);
        this.count = data["count"];
    }
}

class Achievment {
    constructor(data) {
        this.achieved = Date.parse(data["achieved_at"]);
        this.id = data["achievment_id"];
    }
}

class Country {
    constructor(data) {
        this.code = data["code"];
        this.name = data["name"];
    }
}

module.exports = {
    TimestampedCount,
    Achievment,
    Country
};
