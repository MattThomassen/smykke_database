
const db = require('../config/sql').connect();

module.exports = {

    adminCykler: () => {
        return new Promise((resolve, reject) => {

            var sql = `SELECT * FROM cykler ORDER BY cykel_dato`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //opretter cykel
    opretCykel: (cykel_navn, cykel_pris, cykel_billede, cykel_dato, fk_kategori, fk_maerke, fk_model, cykel_beskrivelse) => {
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO cykler
        SET cykel_navn = '${cykel_navn}',
            cykel_pris = '${cykel_pris}',
            cykel_billede = '${cykel_billede}',
            cykel_dato = '${cykel_dato}',
            fk_kategori = '${fk_kategori}',
            fk_maerke = '${fk_maerke}',
            fk_model = '${fk_model}',
            cykel_beskrivelse = '${cykel_beskrivelse}'`;
            console.log('sql: ', sql);
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //updatere en cykel
    redigerCykel: (cykelId, cykelNavn, cykelPris, cykelBillede, cykelDato, fk_kategori, fk_maerke, fk_model, cykelBeskrivelse) => {
        return new Promise((resolve, reject) => {
            var sql = `UPDATE cykler
            SET cykel_navn = '${cykelNavn}',
                cykel_pris = '${cykelPris}',
                cykel_billede = '${cykelBillede}',
                cykel_dato = '${cykelDato}',
                fk_kategori = '${fk_kategori}',
                fk_maerke = '${fk_maerke}',
                fk_model = '${fk_model}',
                cykel_beskrivelse = '${cykelBeskrivelse}'
            WHERE cykel_id = ${cykelId}`;
            console.log(sql);
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //henter alt fra cykler, kategori, mærke og model navn i den cykel du klikker på
    enCykel: (cykel_id) => {
        return new Promise((resolve, reject) => {

            var sql = `SELECT cykler.*, cykel_kategori.kategori_navn AS 'kategori', cykel_maerke.maerke_navn AS 'maerke', cykel_model.model_navn AS 'model'
            FROM((( cykler
            INNER JOIN cykel_kategori
            ON fk_kategori = kategori_id)
            INNER JOIN cykel_maerke
            ON fk_maerke = maerke_id)
            INNER JOIN cykel_model
            ON fk_model = model_id)
            WHERE cykel_id = '${cykel_id}'`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //sletter en cykel
    sletCykel: (cykel_id) => {
        return new Promise((resolve, reject) => {
            var sql = `DELETE FROM cykler WHERE cykel_id = ${cykel_id}`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //viser alle kategorier
    kategori: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_kategori`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //viser alle mærker
    maerke: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM cykel_maerke`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },

    //viser alle modeller
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