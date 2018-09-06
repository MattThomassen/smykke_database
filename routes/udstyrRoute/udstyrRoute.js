
const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const cykelUdstyr = require('../../services/cykelUdstyr');


module.exports = (app) => {
//Render KUN siden udstyr, so mer udstyr.ejs
    app.get('/udstyr', async function (req, res) {
        try {
            const produkter = await tilbud.visTilbud();
            const udstyrKategori = await cykelUdstyr.visUdstyr();
            // console.log('udstyrkategori: ', udstyrKategori);
            res.render('pages/udstyr', {
                produkter: produkter,
                udstyrKategori: udstyrKategori
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 