module.exports = (sequelize, Sequelize) => {
	const InvolvedSector = sequelize.define('involved_sector', {
		name: { type: Sequelize.STRING },
		sectors: { type: Sequelize.STRING },
		isAgreedToTerms: { type: Sequelize.INTEGER },
	});
	return InvolvedSector;
};
