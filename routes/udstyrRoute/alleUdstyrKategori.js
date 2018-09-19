


const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const UdstyrKategori = require('../../services/cykelUdstyr');

module.exports = (app) => {
//Viser alle udstyr i samme kategori, og render siden visEnUdstyr.ejs
    app.get('/alleUdstyrKategori/:id', async function (req, res) {
        let udstyrkategori_id = req.params.id
        try {
            const udstyrInfo = await UdstyrKategori.visAlleTingIEnUdstyrKategori(udstyrkategori_id);      
            const produkter = await tilbud.visTilbud();            
            res.render('pages/visEnUdstyr', {
                produkter: produkter,
                udstyrInfo: udstyrInfo,
                side: 'udstyr'
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 