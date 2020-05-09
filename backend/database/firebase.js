require('dotenv').config();
const firebase = require('firebase');
const admin = require('firebase-admin');
const firebaseConfig = require('../env/firebaseCredentials');

admin.initializeApp(firebaseConfig);

