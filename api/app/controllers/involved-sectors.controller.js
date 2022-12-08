const db = require('../models');
const InvolvedSector = db.involvedSector;

exports.findAll = (req, res) => {
    InvolvedSector.findAll()
        .then((data) => {
            res.send({
                success: true,
                data: data,
                message: "Involved Sectors successfully fetched.",
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

exports.findOne = (req, res) => {
    const id = req.params.id;
    InvolvedSector.findByPk(id)
        .then((data) => {
            if (data) {
                res.send({
                    success: true,
                    data: data,
                    message: "Involved Sector successfully fetched.",
                });
            } else {
                return res.status(404).send({
                    success: false,
                    data: null,
                    message: `Cannot find Involved Sector with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                data: null,
                message: err.message || 'Error retrieving Involved Sector with id=' + id,
            });
        });
};

exports.createInvolvedSectors = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const sectors = req.body.sectors;
    const isAgreedToTerms = req.body.agreeToTerms;

    if (!name) {
        return res.status(400).send({
            success: false,
            data: null,
            message: 'Name can not be empty!',
        });
    }
    if (!sectors || sectors.length <= 0) {
        return res.status(400).send({
            success: false,
            data: null,
            message: 'Sectors can not be empty!',
        });
    }
    if (!isAgreedToTerms) {
        return res.status(400).send({
            success: false,
            data: null,
            message: 'Agreed To Terms can not be empty!',
        });
    }

    const involvedSectors = {
        name: name,
        sectors: "[" + sectors.toString() + "]",
        isAgreedToTerms: isAgreedToTerms,
    };

    if (id && id !== '') {
        let involvedSector;
        InvolvedSector.update(involvedSectors, {
            where: {id: id},
        })
            .then(async (num) => {
                if (num === 1 || (num.length > 0 && num[0] === 1)) {
                    await InvolvedSector.findByPk(id).then((dataSector) => {
                        involvedSector = dataSector;
                    }).catch((err) => {
                        involvedSector = null;
                    });
                    return res.send({
                        success: true,
                        data: involvedSector,
                        message: 'Involved Sector was updated successfully.',
                    });
                } else {
                    return res.send({
                        success: false,
                        data: num,
                        message: `Cannot update Involved Sector with id=${id}. Maybe Involved Sector was not found or request is empty!`,
                    });
                }
            })
            .catch((err) => {
                return res.status(500).send({
                    success: false,
                    data: null,
                    message: err.message || 'Error updating Involved Sectors with id=' + id,
                });
            });
    } else {
        InvolvedSector.create(involvedSectors)
            .then((data) => {
                return res.send({
                    success: true,
                    data: data,
                    message: "Involved Sector successfully created.",
                });
            })
            .catch((err) => {
                return res.status(500).send({
                    success: false,
                    data: null,
                    message: err.message || 'Some error occurred while creating the InvolvedSectors.',
                });
            });
    }
};
