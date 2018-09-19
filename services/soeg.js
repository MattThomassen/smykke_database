

const db = require('../config/sql').connect();

module.exports = {

    avanceretSoeg: (txt) => {
        txt = txt == '' ? '_' : txt;
        // Herunder én løsning. Kunne med fordel gøre "produkt.fk_kategori in (?) and" dynamisk
    
        console.log('service: ', 'navn= ', txt)
        return new Promise((resolve, reject) => {
            let prepare = ['%' + txt + '%']
            var sql = `SELECT *
            FROM cykler
            WHERE cykel_navn LIKE ?
        `;
            db.query(sql, prepare, function (err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
    
}