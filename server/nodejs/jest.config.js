module.exports = {
	testMatch: ["**/__tests__/**/*.?(m)js?(x)", "**/?(*.)(spec|test).?(m)js?(x)"],
	moduleFileExtensions: ["js", "mjs"],
	transform: {
		"^.+.m?js$": "babel-jest"
	},
	testEnvironment: "node",
	globals: {
		__basedir: __dirname
	}
};
