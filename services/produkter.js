
const db = require('../config/sql').connect();

module.exports = {

    paging: (offset, perSide) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT *
            FROM produkter
            ORDER BY id
            LIMIT ${perSide}
            OFFSET ${offset}`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    },

    antal: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT COUNT(id) AS antal FROM produkter`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result[0].antal);
            })
        })
    }

}