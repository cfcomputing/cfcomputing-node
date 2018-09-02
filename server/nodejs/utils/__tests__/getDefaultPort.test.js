const getDefaultPort = require("../getDefaultPort");

test("getDefaultPort is defined", () => {
	expect(getDefaultPort).toBeDefined();
});

test("defaultPort is 8080", () => {
	const defaultPort = getDefaultPort();
	expect(defaultPort).toEqual(8080);
});
