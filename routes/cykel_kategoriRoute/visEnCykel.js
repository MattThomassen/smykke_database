
const db = require('../../config/sql').connect();
const tilbud = require('../../services/tilbud');
const enCykelMedAlleInfo = require('../../services/enCykelMedAlleInfo');

module.exports = (app) => {
//viser alle info om ET cykel, og render etBestemtCykel.ejs
    app.get('/visEnCykel/:id', async function (req, res) {
        let cykelId = req.params.id
        try {
            // console.log('enCykelMedAlleInfo: ', enCykelMedAlleInfo);            
            const info = await enCykelMedAlleInfo.visEnCykel(cykelId);      
            const produkter = await tilbud.visTilbud();            
            res.render('pages/etBestemtCykel', {
                produkter: produkter,
                info: info
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 