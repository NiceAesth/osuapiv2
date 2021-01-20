class AuthenticationError extends Error {
    constructor() {
        super("Failed to authenticate with the osu!API. Token has expired or does not exist.");
        this.name = "AuthenticationError";
    }
}

module.exports = {
    AuthenticationError
};