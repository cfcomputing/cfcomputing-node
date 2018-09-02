class AuthRouteHandler {
	constructor(requestHandler) {
		this.path = "/api/docs";
		this.requestHandler = requestHandler;
	}

	async handler(args) {
		console.log(`running ${__filename} handler for ${this.path}`);

		//faking no auth
		await args.resp.failedAuth(this.requestHandler.constants.__AUTHFAILED);
		return new Error(this.requestHandler.constants.__AUTHFAILED);
	}
}

module.exports = requestHandler => {
	requestHandler.registerHandler(new AuthRouteHandler(requestHandler));
};
