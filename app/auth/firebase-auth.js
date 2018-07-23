const admin = require("firebase-admin");

const serviceAccount = require("../facebook-like-app-firebase-adminsdk-r0g7r-1206806e20.json");

const initializedUser = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://facebook-like-app.firebaseio.com"
});
module.exports = { initializedUser };