
const db = require('../config/sql').connect();
const tilbud = require('../services/tilbud');
const alleNyheder = require('../services/nyheder');

module.exports = (app) => {
//Render siden / som er index.ejs
    app.get('/nyheder', async function (req, res) {
        try {
            const produkter = await tilbud.visTilbud();
            const nyheder = await alleNyheder.alleNyheder();
            // console.log('nyheder: ', nyheder);
            res.render('pages/nyheder', {
                produkter: produkter,
                nyheder: nyheder
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 