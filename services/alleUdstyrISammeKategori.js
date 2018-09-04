
const db = require('../config/sql').connect();

module.exports = {
//bliver requried i visEnUdstyr.js
//Service sql henter alt fra udstyr hvor den tager fra det bestemte id du klikker på
udstyrISammeKategori: (udstyrId) => {
    return new Promise((resolve, reject) => {

        var sql = `SELECT *
        FROM udstyr
        WHERE udstyr_id = '${udstyrId}'`;
        db.query(sql, function (err, result) {
            if (err) reject(err)

            resolve(result);
        });

    })
}

}