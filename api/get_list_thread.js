const express = require('express');
const sqlite3 = require('sqlite3');
const CryptoJS = require('crypto-js');

const child = express.Router();

child.use(express.json());

const secretKey = 'webforum123';

const db = new sqlite3.Database('webforum.db');

const getDataCountDB = (id_kategori = null, id_komunitas = null) => {
    let query_str = '';

    if (id_kategori == null && id_komunitas == null){
        query_str = "SELECT COUNT(*) AS total FROM Tr_Thread";
    }
    else {
        query_str = "SELECT COUNT(*) AS total FROM Tr_Thread where id_kategori = ? and id_komunitas = ?";
    }

    return new Promise((resolve, reject)=>{
        if (id_kategori != null && id_komunitas != null)
        {
            db.get(query_str,[id_kategori, id_komunitas], (err,row)=>{
                if (err){
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }else if (id_kategori == null && id_komunitas == null) {
            db.get(query_str, (err,row)=>{
                if (err){
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }
    })
}
// GET User Login
const getDataDB = (id_kategori = null, id_komunitas = null, limit = 0, offset = 0, id_child = null) => {
    let query_str = '';

    let id_child_final = '';

    
    if (id_child != null){
        id_child_final = " WHERE id = " + id_child;
    }

    if (id_kategori == null && id_komunitas == null){
        query_str = "SELECT * FROM Tr_Thread " + id_child_final + " LIMIT " + limit + " OFFSET " + offset;
    }
    else {
        if (id_child != null)
        {
            query_str = "SELECT * FROM Tr_Thread WHERE id = " + id_child + " AND id_kategori = ? and id_komunitas = ? LIMIT " + limit + " OFFSET " + offset;
        } else {
            query_str = "SELECT * FROM Tr_Thread WHERE id_kategori = ? and id_komunitas = ? LIMIT " + limit + " OFFSET " + offset;
        }
    }

    return new Promise((resolve, reject)=>{
        if (id_kategori != null && id_komunitas != null)
        {
            db.all(query_str,[id_kategori, id_komunitas], (err,row)=>{
                if (err){
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }else if (id_kategori == null && id_komunitas == null) {
            db.all(query_str, (err,row)=>{
                if (err){
                    console.error(err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }
    });
};


child.post('/list/thread', async (req,res)=>{
    // let user_id = req?.body?.['user_id'];
    // let password = req?.body?.['password'];
    let body_data = req?.body;
    let id_kategori_final = null;
    let id_komunitas_final = null;

    if (typeof body_data?.['id_kategori'] != 'undefined' && body_data?.['id_kategori'] != null){
        id_kategori_final = body_data?.['id_kategori'];
    }
    if (typeof body_data?.['id_komunitas'] != 'undefined' && body_data?.['id_komunitas'] != null){
        id_komunitas_final = body_data?.['id_komunitas'];
    }
    
    try {
        const row = await getDataDB(id_kategori_final, id_komunitas_final, body_data?.['limit'], body_data?.['offset'], body_data?.['id']);

        const countrow = await getDataCountDB(id_kategori_final, id_komunitas_final);

        if (typeof row == 'undefined' || row == null){
            res.status(200).send({status:'success', result: null});
        } else {
            res.status(200).send({status:'success', result: {row, count: countrow?.['total']}});
        }   
    }catch(err){
        res.status(400).send({status:'failed', result: null})
    }

});

module.exports = child;