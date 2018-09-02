const path = require("path");
const url = require("url");
const decache = require("decache");

const RequestWriteableStream = require("./requestWriteableStream");
const constants = require("./request.constants");

const { getFilesFromDirSync, getDirRelativeToRoot } = require("../filesystem");

class RequestHandler {
	constructor(Server) {
		this.handlers = {};
		this.constants = constants;

		// get all requestHandlers via the folder handlers (these can be anything but I will look for those named *.request.handler and that have correct signature)
		// synchronous as need them to load prior to app being ready to server
		const dir = getDirRelativeToRoot(Server.config.__basedir, "handlers");
		const files = getFilesFromDirSync({ dir }).filter(f => {
			const rx = new RegExp(/.route.handler.js/gi);
			return rx.test(f.filePath);
		});

		files.forEach(f => {
			// modified decache to fix issue if there is no module.constructor._pathCache line 41 need to submit feature request/pr
			// this will break on jest if attempted without fix in place
			decache(path.resolve(f.filePath)); // purge the cache for this file if exists
			/* eslint-disable-next-line */
			require(path.resolve(f.filePath))(this); // pass reference to this so it can register itself when imported
		});
	}

	registerHandler(handler) {
		if (!(handler.path in this.handlers)) {
			this.handlers[handler.path] = [];
		}
		this.handlers[handler.path].push(handler.handler.bind(handler));
	}

	async handleRequest(args) {
		const requestedPath = url
			.parse(args.req.url)
			.pathname.replace(/\/{1,}$/gi, "")
			.replace(/\\{1,}$/gi, "");
		const response = new RequestWriteableStream({}, args.resp);
		// console.log(`handling request for url: ${path}`);

		if (requestedPath in this.handlers) {
			for (let i = 0, len = this.handlers[requestedPath].length; i < len; i++) {
				const handlerResult = await this.handlers[requestedPath][i]({
					req: args.req,
					resp: response,
					sqldbconn: args.sqldbconn
				});
				if (handlerResult instanceof Error) {
					break;
				}
			}
		} else {
			// if these get past nginx just kill them in case running locally directly or something
			if (requestedPath === "/favicon.ico") {
				response.setHead({ "content-type": "image/x-icon" });
			} else {
				response.setStatusCode(404);
				response.setHead({ "content-type": "text/html" });
				response.write("Not Found");
			}
		}
		response.end();
	}
}

module.exports = RequestHandler;
