// setup connection to postgresql db
const { Client } = require("pg");

class SqlConnection {
	constructor() {
		this.client;
	}

	async initSqlConnection() {
		this.client = new Client();
		await this.client.connect();
	}

	getSqlConnection() {
		return this.client;
	}

	async closeSqlConnection() {
		await this.client.end();
	}

	async runQuery({ qry, args }) {
		return await this.client.query(qry, args);
	}
}

module.exports = SqlConnection;
