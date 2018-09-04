
const db = require('../config/sql').connect();

module.exports = {

    visKategori: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_kategori`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    },
    visAlleCycklerIEnKategori: (fk_kategori) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykler WHERE fk_kategori = ${fk_kategori}`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    }











}