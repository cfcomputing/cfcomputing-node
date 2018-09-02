const getArgs = require("./getArgs");

const getDefaultPortFromArgs = () => {
	const args = getArgs();
	if ("--port" in args) {
		const port = Number(args["--port"]);
		if (!isNaN(port)) {
			return port;
		}
	}
	return 8080;
};

module.exports = getDefaultPortFromArgs;
