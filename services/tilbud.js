
const db = require('../config/sql').connect();

module.exports = {

    visTilbud: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_tilbud LIMIT 3`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    }











}