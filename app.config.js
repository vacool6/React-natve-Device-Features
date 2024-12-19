import "dotenv/config";

export default {
  expo: {
    extra: {
      apiKey: process.env.API_KEY,
      mapStyle: process.env.MAP_STYLE || "toner-grey",
    },
  },
};
