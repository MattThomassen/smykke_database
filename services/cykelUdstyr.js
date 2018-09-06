
const db = require('../config/sql').connect();

module.exports = {
//bliver required i alleUdstyrKategori.js
    visUdstyr: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM udstyr_kategori`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    },
    visAlleTingIEnUdstyrKategori: (udstyrkategori_id) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM udstyr WHERE fk_udstyrkategori = ${udstyrkategori_id}`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    }











}