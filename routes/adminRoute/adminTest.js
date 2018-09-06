

const db = require('../../config/sql').connect();
const adminStuff= require('../../services/adminStuff');

module.exports = (app) => {
//admin route
    app.get('/admin1', async function (req, res) {
        try {
            // const kategori = await adminStuff.kategori();
            const maerke = await adminStuff.maerke();
            // const model = await adminStuff.model();
            res.render('pages/admin1', {
                // kategori: kategori,
                maerke: maerke,
                // model: model
            });
        } catch (err) {
            console.log(err);
        }

    });
}