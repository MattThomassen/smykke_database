
const db = require('../config/sql').connect();
const tilbud = require('../services/tilbud');
const soeg = require('../services/avanceretSoeg');
// const kategorier = require('../services/adminService');


module.exports = (app) => {
    
    app.get('/avanceretSoeg', async (req, res) => {
        try {
            const tilbudt = await tilbud.visTilbud();
            const alleCykler = await soeg.alleCykler();
            // const kat = await kategorier.kategori();            
            res.render('pages/avanceretSoeg', {
                side: 'avanceretSoeg',
                tilbuder: tilbudt,
                alleCykler: alleCykler
                // ,
                // kategori: kat
            })
        } catch (err) {
            console.log(err);
        }
    });



    // app.post('/avanceretSoeg', async (req, res) => {
    //     let txt = req.body.txt;
    //     let kategori = req.body.kategori;
    //     let pris = req.body.pris;
    //     let maerke = req.body.maerke
    //     try {
    //         const produkter = await tilbud.visTilbud();
    //         const avanceretSoeg = await soeg.avanceretSoeg(txt, kategori, pris, maerke);
    //         res.render('pages/avanceretSoeg', {
    //             produkter: produkter,
    //             'Søg': avanceretSoeg
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

}
