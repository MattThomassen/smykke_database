const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const alleUdstyrISammeKategori = require('../../services/alleUdstyrISammeKategori');

module.exports = (app) => {
//Viser alle udstyr i samme kategori
    app.get('/visEnBestemtUdstyr/:id', async function (req, res) {
        let udstyrId = req.params.id
        try {
            const udstyrInfo = await alleUdstyrISammeKategori.udstyrISammeKategori(udstyrId);      
            const produkter = await tilbud.visTilbud();            
            res.render('pages/etBestemtUdstyr', {
                produkter: produkter,
                udstyrInfo: udstyrInfo,
                side: 'udstyr'
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 