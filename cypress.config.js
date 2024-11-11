const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://sustainablecottonhub.org/',
    chromeWebSecurity: false,
    videoCompression: 15,
  },
});
