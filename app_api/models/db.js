var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/airloft';

if(process.env.NODE_ENV == 'production'){
	dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected');
});

var graceShutDown = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('Mongoose is closed through ' + msg);
		callback();
	});
};

process.once('SIGUSR2', function(){
	graceShutDown('nodemon restart', function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.once('SIGINT', function(){
	graceShutDown('app termination', function(){
		process.exit(0);
	});
});

process.once('SIGTERM', function(){
	graceShutDown('Heroku app shutdown', function(){
		process.exit(0);
	})
})

require('./missions');
require('./users');