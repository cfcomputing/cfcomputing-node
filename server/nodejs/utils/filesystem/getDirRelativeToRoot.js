const path = require("path");
const fs = require("fs");

const getDirRelativeToRoot = (rootdir, dir) => {
	return fs.realpathSync(`${rootdir}${path.sep}${dir}${path.sep}`);
};

module.exports = getDirRelativeToRoot;
