

const db = require('../../config/sql').connect();
const adminService = require('../../services/adminService');

module.exports = (app) => {
//admin route
    app.get('/admin', async function (req, res) {
        try {
            const kategori = await adminService.kategori();
            const maerke = await adminService.maerke();
            const model = await adminService.model();
            res.render('pages/admin', {
                kategori: kategori,
                maerke: maerke,
                model: model
            });
        } catch (err) {
            console.log(err);
        }

    });

    //opretter en cykel
    app.post('/opret', async (req, res) => {
        let cykel_navn = req.body.cykel_navn
        let cykel_pris = req.body.cykel_pris
        let cykel_billede = req.body.cykel_billede
        let cykel_dato = req.body.cykel_dato
        let fk_kategori = req.body.kategori
        let fk_maerke = req.body.maerke
        let fk_model = req.body.model
        let cykel_beskrivelse = req.body.cykel_beskrivelse

        try {
            const opret = await adminService.opretCykel(cykel_navn, cykel_pris, cykel_billede, cykel_dato, fk_kategori, fk_maerke, fk_model, cykel_beskrivelse);
            res.redirect('/admin')
        } catch (err) {
            console.log(err);
        }
    });

    //render rediger siden
    app.get('/rediger/:id', async function (req, res) {
        let cykel_id = req.params.id
        try {
            const enCykel = await adminService.enCykel(cykel_id);
            const kategori = await adminService.kategori();
            const maerke = await adminService.maerke();
            const model = await adminService.model();
            // console.log('cykel: ', enCykel);
            res.render('pages/adminRediger', {
                enCykel: enCykel,
                kategori: kategori,
                maerke: maerke,
                model: model
            });
        } catch (err) {
            console.log(err);
            // res.send(err);
        }
    });

    //redigere en cykel
    app.post('/redigere/:id', async (req, res) => {
        let cykelId = req.params.id
        let cykelNavn = req.body.navn
        let cykelPris = req.body.pris
        let cykelBillede = req.body.billede
        let cykelDato = req.body.dato
        let fk_kategori = req.body.kategori
        let fk_maerke = req.body.maerke
        let fk_model = req.body.model
        let cykelBeskrivelse = req.body.beskrivelse
        // console.log(': ', );
        try {
            const redigerCykel = await adminService.redigerCykel(cykelId, cykelNavn, cykelPris, cykelBillede, cykelDato, fk_kategori, fk_maerke, fk_model, cykelBeskrivelse);
            res.redirect('/admin');
        } catch (err) {
            console.log(err);
        }
    });

    //slet en cykel
    app.post('/sletCykel/:id', async (req, res) => {
        let cykel_id = req.params.id
        try {
            const slet = await adminService.sletCykel(cykel_id);
            res.redirect('/adminCykler')
        } catch (err) {
            console.log(err);
        }
    });

};//END module.export 