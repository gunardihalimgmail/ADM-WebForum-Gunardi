const express = require('express');
const sqlite3 = require('sqlite3');
const CryptoJS = require('crypto-js');

const app = express();
const port = 3001

app.use(express.json());

const secretKey = 'webforum123';

const db = new sqlite3.Database('webforum.db');

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
})

// CREATE TABLE AS DEFAULT
db.serialize(()=>{
    db.run('CREATE TABLE IF NOT EXISTS Ms_Login(user_id TEXT PRIMARY KEY, password TEXT)');
});

const userLogin = require('./api/user_login');
const userCreate = require('./api/user_create');
const getListThread = require('./api/get_list_thread');
const getListThreadReply = require('./api/get_list_thread_reply');
const threadCreate = require('./api/thread_create');
const threadReply = require('./api/thread_reply');

app.use('/',userLogin);
app.use('/',userCreate);
app.use('/',getListThread);
app.use('/',getListThreadReply);
app.use('/',threadCreate);
app.use('/',threadReply);

app.listen(process.env.PORT || port, () => {
    console.log('Cara PORT ',port)
})