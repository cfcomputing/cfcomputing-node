const { Writable } = require("stream");
const { StringDecoder } = require("string_decoder");

class RequestWriteableStream extends Writable {
	constructor(options, resp) {
		super(options);
		this._decoder = new StringDecoder(options && options.defaultEncoding);
		this.data = "";
		this.resp = resp;
		this.statusCode = 200;
		this.head = { "content-type": "application/json" };
	}

	_write(chunk, encoding, callback) {
		if (encoding === "buffer") {
			chunk = this._decoder.write(chunk);
		}
		this.data += chunk;
		callback();
	}

	_final(callback) {
		this.data += this._decoder.end();
		try {
			this.resp.writeHead(this.statusCode, this.head);
			this.resp.end(this.data);
		} catch (e) {
			// have to catch writing here
			console.log("ERROR in WritableStream", e);
			this.resp.end();
		}
		callback();
	}

	setHead(obj) {
		Object.keys(obj).forEach(key => {
			this.head[key] = obj[key];
		});
	}

	setStatusCode(code) {
		this.statusCode = code;
	}

	failedAuth(reason) {
		this.resp.writeHead(401, { "content-type": "application/json" });
		this.resp.write(JSON.stringify({ Unauthorized: reason }));
		this.resp.end();
	}
}

module.exports = RequestWriteableStream;
