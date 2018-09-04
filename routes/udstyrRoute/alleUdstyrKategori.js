
const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const alleUdstyrISammeKategori = require('../../services/alleUdstyrISammeKategori');

module.exports = (app) => {
//Viser alle udstyr i samme kategori
    app.get('/alleUdstyrKategori/:id', async function (req, res) {
        let udstyrId = req.params.id
        try {
            const udstyrInfo = await alleUdstyrISammeKategori.udstyrISammeKategori(udstyrId);      
            const produkter = await tilbud.visTilbud();            
            res.render('pages/visEnUdstyr', {
                produkter: produkter,
                udstyrInfo: udstyrInfo
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 