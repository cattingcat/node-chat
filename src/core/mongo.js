const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/myproject';

module.exports = {
	/*list: function(){

		MongoClient.connect(url, function(err, db){
			let collection = db.collection('test');
			collection.insert(
				{a: 1, b: 2, c: 3}, 
				function(err, res){
					if(err) {
						console.log('db error');
						console.log(err);
					}
				}
			);
		});
	},
	proxy: Proxy.create({
		get: function(receiver, index){
			console.log(index);
		},
		set: function(receiver, index, value){
			console.log('set');
		}
	})*/
};