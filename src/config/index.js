const dotenv = require("dotenv");
dotenv.config(); // added dotenv.config()

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = {
    port: process.env.PORT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    oauthUrl: process.env.OAUTH_URL,
    apiUrl: process.env.API_URL,
}
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = config; // change from { config } to config
