const app = require('./app')
const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://viktor:Lc74lMFJekcvbyrK@cluster-vik-0.bm7zdbj.mongodb.net/contacts_base?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
	.then(() => {
		app.listen(3000)
	})
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	})
