/**
 * Usage
 * 
 *   
    console.log("Starting");
    const startTime = new Date();
    const dir = "C:\\";
    const files = getAllFilesFromDirSync({ dir });
    console.log(`1) ${files.length} files resolved`);
    const endTime = new Date();
    console.log(`\nComplete\nStarted:${startTime}\nFinished:${endTime}\nTook:${endTime - startTime}`);
 */
const fs = require("fs");
const path = require("path");

const getFilesFromDirSync = ({ dir }) =>
	fs.readdirSync(dir).reduce((files, file) => {
		const filePath = path.join(dir, file);
		try {
			const isDirectory = fs.statSync(filePath).isDirectory();
			return isDirectory
				? [].concat(files, getFilesFromDirSync({ dir: filePath }))
				: [].concat(files, { filePath });
		} catch (e) {
			return [].concat(files);
		}
	}, []);

module.exports = getFilesFromDirSync;
