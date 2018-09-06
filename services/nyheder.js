
const db = require('../config/sql').connect();

module.exports = {

    alleNyheder: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykler
                        ORDER BY cykel_dato DESC
                        LIMIT 2`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    }











}