module.exports = (app) => {
	const router = require('express').Router();
	const sectors = require('../controllers/sector.controller.js');
	const involvedSectors = require('../controllers/involved-sectors.controller.js');

	router.get('/sectors', sectors.findAll);
	router.get('/all-involved-sectors', involvedSectors.findAll);
	router.get('/involved-sector-by/:id', involvedSectors.findOne);
	router.post('/involved-sectors', involvedSectors.createInvolvedSectors);

	app.use('/api/public', router);
};
