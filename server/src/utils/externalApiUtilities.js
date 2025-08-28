const { default: axios } = require("axios");
const QueryString = require("qs");

const callGoogleExternalApi = async (code) => {
  try {
    return await axios.post(
      "https://oauth2.googleapis.com/token",
      QueryString.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  callGoogleExternalApi,
};
