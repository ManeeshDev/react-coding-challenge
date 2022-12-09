module.exports = (sequelize, Sequelize) => {
	const InvolvedSector = sequelize.define('involved_sector', {
		name: { type: Sequelize.STRING },
		sectors: { type: Sequelize.STRING },
		isAgreedToTerms: { type: Sequelize.INTEGER },
	});

	(async () => {
		await InvolvedSector.sync();
		const {count, rows} = await InvolvedSector.findAndCountAll();
		if (count === 0 && rows.length === 0) {
			console.log("===================================InvolvedSector bulkCreate======================");
			InvolvedSector.bulkCreate([
				{name: 'Maneesh', sectors: '[121,28,35,122,581,6]', isAgreedToTerms: 1 },
				{name: 'Shalini', sectors: '[6,40,43,390,98,18]', isAgreedToTerms: 1 },
				{name: 'Yashika', sectors: '[101,392,224,91,341]', isAgreedToTerms: 1 },
				{name: 'Prashantha', sectors: '[33,51,263]', isAgreedToTerms: 1 },
				{name: 'Kavindya', sectors: '[42,141,342,113]', isAgreedToTerms: 1 },
			]).then(() => {
				console.log("InvolvedSector bulkCreate done..");
				console.log("===================================InvolvedSector bulkCreate======================");
			});
		}
	})();

	return InvolvedSector;
};
