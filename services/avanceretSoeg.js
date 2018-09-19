

const db = require('../config/sql').connect();

module.exports = {

    

    avanceretSoeg: (txt, kategori = [], pris, maerke = []) => {
        txt = txt == '' ? '_' : txt;
        // Herunder én løsning. Kunne med fordel gøre "produkt.fk_kategori in (?) and" dynamisk
        if (kategori.length == 0) {
            for (i = 0; i < 10; i++)kategori.push(i);
        }
        if (maerke.length == 0) {
            for (i = 0; i < 10; i++)kategori.push(i);
        }
        pris = (pris == '' || isNaN(pris)) ? 1000000 : pris;

        console.log('service: ', 'navn= ', txt, 'kategori= ', kategori, 'pris= ', pris, 'mærke= ', maerke)
        return new Promise((resolve, reject) => {
            let prepare = ['%' + txt + '%', kategori, pris, maerke]
            var sql = `SELECT cykler.*, cykel_kategori.kategori_navn AS 'kategori', cykel_maerke.maerke_navn AS 'maerke'
            FROM ((cykler
            INNER JOIN cykel_kategori ON fk_kategori = kategori_id )
            INNER JOIN cykel_maerke ON fk_maerke = maerke_id)
            where
            cykler.cykel_navn like ? and
            cykler.fk_kategori in (?) and
            cykler.fk_maerke in (?) and            
            cykler.cykel_pris <= ?
        `;
            db.query(sql, prepare, function (err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    },

    alleCykler: () => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT cykler.*, cykel_kategori.kategori_navn AS 'kategori', cykel_maerke.maerke_navn AS 'maerke'
            FROM ((cykler
            INNER JOIN cykel_kategori ON fk_kategori = kategori_id )
            INNER JOIN cykel_maerke ON fk_maerke = maerke_id)`;
            db.query(sql, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    }
}