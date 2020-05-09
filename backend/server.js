const express = require('express');
require('dotenv').config({ path: './env/.env' });
const cors = require('cors');
const db = require('./database');
const usersRouter = require('./routes/Users/user');

const port = process.env.PORT || process.env.DEV_PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/* Routes */

app.get('/', (req, res) => {
    res.send('AANS-API');
});

app.use('/users', usersRouter);

app.listen(port , (err) => {
    if(err){ throw err; }
    console.log(`Listening on port ${port}`);
})

