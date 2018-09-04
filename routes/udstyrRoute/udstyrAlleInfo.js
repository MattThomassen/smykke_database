
const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const UdstyrKategori = require('../../services/cykelUdstyr');

module.exports = (app) => {
//Viser alle info om ET udstyr, og render siden visEnUdstyr.ejs
    app.get('/visEnUdstyrKategori/:id', async function (req, res) {
        let udstyrkategori_id = req.params.id
        try {
            const info = await UdstyrKategori.visAlleTingIEnUdstyrKategori(udstyrkategori_id);      
            const produkter = await tilbud.visTilbud();            
            res.render('pages/etBestemtUdstyr', {
                produkter: produkter,
                info: info
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 