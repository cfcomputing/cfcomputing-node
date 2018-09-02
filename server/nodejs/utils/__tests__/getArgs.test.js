const getArgs = require("../getArgs");

test("getArgs is defined", () => {
	expect(getArgs).toBeDefined();
});

test("getArgs with empty argv passed returns empty obj", () => {
	// eslint-disable-next-line no-global-assign
	process = { argv: [] };
	expect(getArgs()).toEqual({});
});

test("getArgs with --port=80 returns obj correctly set", () => {
	// eslint-disable-next-line no-global-assign
	process = { argv: ["process.execPath", "jsfileexecuting", "--port=80"] };
	expect(getArgs()).toEqual({ "--port": "80" });
});

test("getArgs with non = returns obj with strange key", () => {
	// eslint-disable-next-line no-global-assign
	process = { argv: ["process.execPath", "jsfileexecuting", "--port 80"] };
	expect(getArgs()).toEqual({ "--port 80": true });
});
