module.exports = {
	get: (path, method) => {
		return fetch(path, {
			method: method
		}).then((res) => res.json());
	}
};
