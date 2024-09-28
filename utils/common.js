module.exports = {
    warn: function warn(msg) {
        console.error(`Warning: ${msg}`);
    },
    generateId: function (length = 14) {
        // Generate a random string, default length is 16
        return Math.random().toString(36).substring(2, 2 + length);
    }
}