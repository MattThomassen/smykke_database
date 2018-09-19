
const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const cyklerKategori = require('../../services/cyklerKategori');

module.exports = (app) => {
//Viser alle cykler i samme kategori, og render visEnKategori.ejs
    app.get('/alleKategori/:id', async function (req, res) {
        let kategori_id = req.params.id
        try {
            const enKategori = await cyklerKategori.visAlleCycklerIEnKategori(kategori_id);
            const produkter = await tilbud.visTilbud(); 
            console.log(enKategori);
                       
            res.render('pages/visEnKategori', {
                enKategori: enKategori,
                produkter: produkter,
                side: 'cykler'
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 