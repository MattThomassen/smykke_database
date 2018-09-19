
const db = require('../config/sql').connect();
const tilbud = require('../services/tilbud');
const pageRoute = require('../services/paging');
// const cyklerKategori = require('../services/cyklerKategori');


module.exports = (app) => {
//Render paging
    app.get('/alleKategori/:id/:page', async function (req, res) {
        let page = req.params.page
        console.log(page)
        let kategori_id = req.params.id
        
        try {
            const produkter = await tilbud.visTilbud();
            const paging = await pageRoute.paging(kategori_id, page);
            // const enKategori = await cyklerKategori.visAlleCycklerIEnKategori(kategori_id);
            // console.log('nyheder: ', nyheder);
            console.log(paging);
            res.render('pages/visEnKategori', {
                produkter: produkter,
                // enKategori : enKategori,
                enKategori: paging,
                side: 'cykler',
                // page: page
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 