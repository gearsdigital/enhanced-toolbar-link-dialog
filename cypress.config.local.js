const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "http://starterkit.test",
		video: false
	}
});
