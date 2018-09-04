
const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const cyklerKategori = require('../../services/cyklerKategori');


module.exports = (app) => {
//Render siden cykler, som er cykler.ejs
    app.get('/cykler', async function (req, res) {
        try {
            const produkter = await tilbud.visTilbud();
            const kategori = await cyklerKategori.visKategori();
            res.render('pages/cykler', {
                produkter: produkter,
                kategori: kategori
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 