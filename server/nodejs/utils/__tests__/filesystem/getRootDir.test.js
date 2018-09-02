const getRootDir = require("../../filesystem/getRootDir");

test("getRootDir is defined", () => {
	expect(getRootDir).toBeDefined();
});

test("getRootDir with empty returns current dir", () => {
	const rtn = getRootDir();
	const expected = global.__basedir;
	console.log("getRootDir()", rtn, expected);
	expect(rtn).toEqual(expected);
});
