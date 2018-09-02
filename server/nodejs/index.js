const Server = require("./utils/server");
const vanillaServer = new Server({
	__basedir: __dirname
});
vanillaServer.init();
