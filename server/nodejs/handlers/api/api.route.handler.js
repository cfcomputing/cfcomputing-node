class APIRouteHandler {
	constructor() {
		this.path = "/api";
	}

	async handler(args) {
		console.log(`running ${__filename} handler for ${this.path}`);

		args.resp.write(JSON.stringify({"CFComputing API":"Welcome!"}));
	}
}

module.exports = requestHandler => {
	requestHandler.registerHandler(new APIRouteHandler());
};
