
const db = require('../config/sql').connect();
const tilbud = require('../services/tilbud');
// const cykler = require('../services/av');
const soeg = require('../services/avanceretSoeg');

module.exports = (app) => {
    //render søg
    app.get('/soeg', async (req, res) => {
        try {
            const produkter = await tilbud.visTilbud();
            const alleCykler = await soeg.alleCykler();
            res.render('pages/avanceretSoeg', {
                produkter: produkter,
                alleCykler: alleCykler
            })
        } catch (err) {
            console.log(err);
        }
    });

    app.post('/avanceretSoeg', async (req, res) => {
        let txt = req.body.txt;
        let kategori = req.body.kategori;
        let pris = req.body.pris;
        let maerke = req.body.maerke
        try {
            const produkter = await tilbud.visTilbud();
            const avanceretSoeg = await soeg.avanceretSoeg(txt, kategori, pris, maerke);
            res.render('pages/avanceretSoeg', {
                produkter: produkter,
                'Søg': avanceretSoeg
            })
        } catch (err) {
            console.log(err);
        }
    });

}
