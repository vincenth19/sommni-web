const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ms", "zh", "zh-TW", "hi"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};