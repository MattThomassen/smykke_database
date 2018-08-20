const db = require('.././config/sql').connect();

module.exports = (app) => {
    //Default side, når serveren starter.
    app.get('/', (req, res) => {
        res.render('pages/index', {defaultSide: 'index'})
    })

    //Henter alle colonner fra smykker
    app.get('/smykker', () => {
        db.sql(`SELECT * FROM smykker`);
        db.query(sql, (error, rows) => {
            if (error) {
                console.log(error);
            }else {
                res.json(rows);
            }
        })
    })

}; //module.exports End