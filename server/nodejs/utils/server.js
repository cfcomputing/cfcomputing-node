const http = require("http");
const getDefaultPort = require("./getDefaultPort");
const sqlConnection = require("./sqlConnection");
const requestHandler = require("./request/requestHandler");

class Server {
	constructor(severConfig) {
		this.config = severConfig;

		// make connection to sql db
		const sqldbconn = new sqlConnection(this);
		sqldbconn.initSqlConnection();

		// find all handlers
		const reqHandler = new requestHandler(this);

		this.server = http.createServer((req, resp) => {
			// handle the request with one of the registered handlers or fallback to the default
			reqHandler.handleRequest({ req, resp, sqldbconn });
		});
	}

	init({ port = getDefaultPort() } = {}) {
		this.server.listen(port, () => {
			console.log(`NODEJS http server listening on port: ${port}`);
		});
	}
}

module.exports = Server;
