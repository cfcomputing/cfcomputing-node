class RootRouteHandler {
	constructor() {
		this.path = "";
	}

	async handler(args) {
		const sqlres = await args.sqldbconn.runQuery({ qry: "SELECT $1::text as message", args: ["Connected!"] });
		args.resp.write(JSON.stringify({ message: sqlres.rows[0].message }));
	}
}

module.exports = requestHandler => {
	requestHandler.registerHandler(new RootRouteHandler());
};
