
const db = require('../config/sql').connect();
const tilbud = require('../services/tilbud');
const soeg = require('../services/soeg');
const kategorier = require('../services/adminService');


module.exports = (app) => {
    //render avanceret søg og er normal søg
    app.post('/soeg', async (req, res) => {
        let txt = req.body.txt;
        try {
            const tilbudt = await tilbud.visTilbud();
            const alleCykler = await soeg.alleCykler();
            res.render('pages/soeg', {
                side: 'soeg',
                tilbuder: tilbudt,
                alleCykler: alleCykler
            });
        } catch (err) {
            console.log(err);
        }
    });

}
