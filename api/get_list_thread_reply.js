const express = require('express');
const sqlite3 = require('sqlite3');
const CryptoJS = require('crypto-js');

const child = express.Router();

child.use(express.json());

const secretKey = 'webforum123';

const db = new sqlite3.Database('webforum.db');

// GET User Login
const getDataDB = (id_thread_parent = null) => {
    let query_str = '';

    query_str = "SELECT * FROM Tr_Thread_Reply WHERE id_thread_parent = ? ORDER BY tanggal desc";

    return new Promise((resolve, reject)=>{

          db.all(query_str, [id_thread_parent], (err,row)=>{
              if (err){
                  console.error(err);
                  reject(err);
              } else {
                  resolve(row);
              }
          });

    });
};


child.post('/list/thread/reply', async (req,res)=>{
    
    let body_data = req?.body;
    
    try {
        const row = await getDataDB(body_data?.['id_thread_parent']);

        if (typeof row == 'undefined' || row == null){
            res.status(200).send({status:'success', result: null});
        } else {
            res.status(200).send({status:'success', result: {row}});
        }   
    }catch(err){
        res.status(400).send({status:'failed', result: null})
    }

});

module.exports = child;