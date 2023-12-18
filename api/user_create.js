const express = require('express');
const sqlite3 = require('sqlite3');
const CryptoJS = require('crypto-js');

const child = express.Router();

child.use(express.json());

const secretKey = 'webforum123';

const db = new sqlite3.Database('webforum.db');

// GET User Login
const getUserDB = (user_id) => {
    return new Promise((resolve, reject)=>{
        db.get("SELECT * FROM Ms_Login where user_id = ?",[user_id], (err,row)=>{
            if (err){
                console.error(err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};


child.post('/user/create', async (req,res)=>{
    // let user_id = req?.body?.['user_id'];
    // let password = req?.body?.['password'];
    const { user_id, password } = req?.body;
    
    try {
        const row = await getUserDB(user_id);
        // let dekrip = CryptoJS.AES.decrypt(row?.['password'], secretKey).toString(CryptoJS.enc.Utf8);
        // let enkrip = CryptoJS.AES.encrypt('a', secretKey).toString();

        if (typeof row != 'undefined' || row != null){
            if (row?.['user_id'] != '' && row?.['user_id'] != null)
            {
                res.status(200).send({status:'success', result: null, message: 'User is already Exists !'});
                return
            }
        }
        else {
            
            let enkrip_pass = CryptoJS.AES.encrypt(password, secretKey).toString();

            if (enkrip_pass != null && enkrip_pass != '')
            {
                db.run('INSERT INTO Ms_Login(user_id, password) VALUES(?, ?)',[user_id, enkrip_pass], (err)=>{

                    if (err){
                        return res.status(500).json({ error: err.message });
                    }

                    res.status(200).send({status:'success', result:'User Success Created !'});
                })
            } else {
                res.status(200).send({status:'success', result: null});
            }
        }   
    }catch(err){
        res.status(400).send({status:'failed', result: null})
    }

});

module.exports = child;