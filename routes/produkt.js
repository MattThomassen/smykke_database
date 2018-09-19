
const db = require('../config/sql').connect();
const pageRoute = require('../services/produkter');


module.exports = (app) => {
//Render paging
    app.get('/produkter/:offset', async function (req, res) {
        let offset = req.params.offset
        console.log(offset)
        const perSide = 3;
        
        try {
            const paging = await pageRoute.paging(offset, perSide);
            const antalProdukter = await pageRoute.antal();//7
            const antalPagingLinks = Math.ceil(antalProdukter/perSide);
            console.log(antalPagingLinks); 
            // console.log(antal);          
            console.log(paging);
            res.render('pages/test', {
                antalPagingLinks : antalPagingLinks,
                paging: paging,
                side: 'cykler',
                perSide: perSide
            });
        } catch (err) {
            console.log(err);
        }

    });

};//END module.export 