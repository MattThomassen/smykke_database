
const db = require('../config/sql').connect();

module.exports = {

    paging: (fk_kategori, page) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT cykler.*
            FROM cykler
            WHERE fk_kategori = ${fk_kategori}
            ORDER BY cykler.cykel_id
            LIMIT 3
            OFFSET ${page}`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    }

}