
const db = require('../config/sql').connect();

module.exports = {
//Servicen bliver required i visEnCykel.js
//Den henter alt fra cykler fra et bestemt id du klikkede på
visEnCykel: (cykelId) => {
    return new Promise((resolve, reject) => {

        var sql = `SELECT *
        FROM cykler
        WHERE cykel_id = '${cykelId}'`;
        db.query(sql, function (err, result) {
            if (err) reject(err)

            resolve(result);
        });

    })
}

}