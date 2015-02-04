const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/myproject';

module.exports = {
	createRoom: function(room){
		MongoClient.connect(url, function(err, db){
			var collection = db.collection('Rooms');
			collection.insert(room, function(err, res){
				// nop
			});
		});
	},
	getRooms: function(name, callback){
		MongoClient.connect(url, function(err, db){
			var collection = db.collection('Rooms');
			collection.find({name: name}).toArray(function(err, res){
				callback(res);
			});
		});
	}
};