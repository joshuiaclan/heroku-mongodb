const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
const database = "aans-db?retryWrites=true&w=majority";
const connString = uri+database;

const options = {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(connString, options)
    .catch(error => handleError(error));

mongoose.connection.on('error', err => {
    console.log(err);
});

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('MongoDB  connection established successsfully!');
})

module.exports = conn;