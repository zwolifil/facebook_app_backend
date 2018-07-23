const { initializedUser } = require('./firebase-auth');

function authenticate(token) {
    if (!token) {
        console.log("ALERT");
        return null;
    }
    return initializedUser.auth().verifyIdToken(token);
}

module.exports = {authenticate};