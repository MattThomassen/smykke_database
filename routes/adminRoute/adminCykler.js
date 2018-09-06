
const db = require('../../config/sql').connect();
const adminService = require('../../services/adminservice');

module.exports = (app) => {
//admin route
    app.get('/adminCykler', async function (req, res) {
        try {
            const cykler = await adminService.adminCykler();
            res.render('pages/adminCykler', {
            cykler: cykler
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 