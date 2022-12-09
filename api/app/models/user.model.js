module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		email: { type: Sequelize.STRING },
		password: { type: Sequelize.STRING },
	});

	(async () => {
		await User.sync();
		const {count, rows} = await User.findAndCountAll();
		if (count === 0 && rows.length === 0) {
			console.log("===================================User bulkCreate======================");
			User.bulkCreate([
				{email: 'maneesh@gmail.com', password: '&yqpXPwHDKZVr2?' },
			]).then(() => {
				console.log("User bulkCreate done..");
				console.log("===================================User bulkCreate======================");
			});
		}
	})();

	return User;
};
