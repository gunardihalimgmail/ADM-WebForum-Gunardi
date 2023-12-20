const express = require('express');
const sqlite3 = require('sqlite3');
const CryptoJS = require('crypto-js');
const { formatDate } = require('../server-functions');

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


child.post('/thread/create', async (req,res)=>{
    // let user_id = req?.body?.['user_id'];
    // let password = req?.body?.['password'];
    const { user_id, id_kategori, id_komunitas, judul, content } = req?.body;
  

    try {
        const row = await getUserDB(user_id);
			
        // let dekrip = CryptoJS.AES.decrypt(row?.['password'], secretKey).toString(CryptoJS.enc.Utf8);
        // let enkrip = CryptoJS.AES.encrypt('a', secretKey).toString();

        if (typeof row != 'undefined' && row != null){
            if (row?.['user_id'] == '' || row?.['user_id'] == null)
            {
                res.status(200).send({status:'success', result: null, message: 'User is not Exists !'});
                return
            }
        }
						
				if (!id_kategori || !id_komunitas){
						res.status(200).send({status:'success', result: null, message: 'Periksa kembali id kategori dan komunitas !'});
						return
				}

				if (!content || !judul){
						res.status(200).send({status:'success', result: null, message: 'Content dan Judul tidak boleh kosong !'});
						return
				}

				let p_tanggal = formatDate(new Date(),'YYYY-MM-DD HH:mm:ss');
				let p_id_kategori = id_kategori;
				let p_id_komunitas = id_komunitas;
				let p_content = content;
				let p_judul = judul;
				let p_user_id = user_id;

				db.run('INSERT INTO Tr_Thread(tanggal, id_kategori, id_komunitas, judul, content, user_id) ' + 
								'VALUES(?, ?, ?, ?, ?, ?)',[p_tanggal, p_id_kategori, p_id_komunitas, p_judul, p_content, p_user_id], (err)=>{

						if (err){
								return res.status(500).json({ error: err.message });
						}

						res.status(200).send({status:'success', result:'Thread Success Created !'});
						return
				})
    }catch(err){
        res.status(400).send({status:'failed', result: null})
    }

});

module.exports = child;