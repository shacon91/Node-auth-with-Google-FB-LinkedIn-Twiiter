var mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.dbURI);

mongoose.Promise = global.Promise;

mongoose.connection
		.once('open', () => {
			console.log('connected');
		})
		.on('error', (error) => {
			console.log(error);
		});