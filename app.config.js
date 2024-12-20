import "dotenv/config";

export default {
  expo: {
    extra: {
      apiKey: process.env.API_KEY,
      apiEndpoint: process.env.API_ENDPOINT,
      mapStyle: process.env.MAP_STYLE || "toner-grey",
    },
  },
};
