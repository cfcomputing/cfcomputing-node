/**
 * GetArgs will return an obj of the arguments index by their name
 */
const getArgs = () => {
	const args = process.argv.slice(2).reduce((acc, item) => {
		const [key, value = true] = item.split("=");
		return { ...acc, [key]: value };
	}, {});
	return args;
};

module.exports = getArgs;
