const config = require('config');

 const mongoose = require('mongoose');
 const db = config.get('mongoURI');

const connectDB = async () => {
 	try {
         console.log("Trying to connect");
 		await mongoose.connect(db, {
 			useNewUrlParser: true,
 			// useCreateIndex: true,
 			// useFindAndModify: false,
 			useUnifiedTopology: true
 		});
 		console.log('MongoDB Connected...');
 	} catch (err) {
 		console.error(err.message);
 		// Exit process with failure
 		process.exit(1);
 	}
 };

 module.exports = connectDB;