const db = require('../models');
const User = db.users;
const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email) {
		return res.status(400).send({message: 'Email can not be empty!',});
	}
	if (!password) {
		return res.status(400).send({message: 'Password can not be empty!',});
	}
	if (!validEmail(email)) {
		return res.status(400).send({message: 'This email is not valid email address!',});
	}
    if (!validPassword(password)) {
		return res.status(400).send({message: 'This password is not valid password!',});
    }
	User.findOne({
		where: {email: email,},
	}).then((user) => {
		if (user) {
			return res.status(400).send({message: 'Failed! Username is already in use!',});
		} else {
			const user = {
				email: email,
				password: bcrypt.hashSync(password, 8),
				isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				mobile: req.body.mobile,
				birthday: req.body.birthday,
				gender: req.body.gender,
				profession: req.body.profession,
			};
			User.create(user)
				.then((data) => {
					return res.send(data);
				})
				.catch((err) => {
					return res.status(500).send({
						message: err.message || 'Some error occurred while creating the User.',
					});
				});
		}
	});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	User.findByPk(id)
		.then((data) => {
			if (data) {
				return res.send(data);
			} else {
				return res.status(404).send({message: `Cannot find User with id=${id}.`,});
			}
		})
		.catch((err) => {
			return res.status(500).send({message: 'Error retrieving User with id=' + id,});
		});
};


function validEmail(email) {
	const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	return regex.test(String(email).toLowerCase());
}

function validPassword(password) {
	const hasSquareBracketsOrBackslash = password !== password.replace(/\[|\]/g, '').replace(/\\|\//g, '');
	const specialChar = (password.match(/[~/`%^*:;"'<>?,-.|_=+(){}]+/) && !hasSquareBracketsOrBackslash);
	const length = password.toString().length >= 6;
	const hasNumber = password.match(/\d/);
	return !!(specialChar && length && hasNumber);
}
