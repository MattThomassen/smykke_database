

const db = require('../config/sql').connect();

module.exports = {

    kategori: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_kategori`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    maerke: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_maerke`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    model: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_model`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    }

}