const db = require('../models');
const Sector = db.sectors;

exports.findAll = (req, res) => {
    Sector.findAll()
        .then((data) => {
            res.send({
                success: true,
                data: data,
                message: "Sectors successfully fetched.",
            });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                data: null,
                message: err.message || 'Some error occurred while retrieving sectors.',
            });
        });
};
