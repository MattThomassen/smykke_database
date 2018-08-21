

const db = require('.././config/sql').connect();

module.exports = (app) => {
     // Viser alle produkter på shop siden
     app.get('/', function (req, res) {
         var sql = `SELECT smykker.*, metal.navn AS 'metal', kategori.navn AS 'kategori' 
         FROM ((smykker 
         INNER JOIN metal ON fk_metal = metal_id )
         INNER JOIN kategori ON fk_kategori = kategori_id)`
        //  console.log(sql);
        db.query(sql, (error, rows) => {
                //Test routes direkte i browseren (i URL'en) : 
                // console.log(rows); tester om der bliver vist sql på siden
                // res.send()  tester om der bliver vist sql på siden uden at der er en html side endnu
                // console.log(rows);
                res.render('pages/index', {
                    side: "produkter",
                    produkter: rows
                })
            });

    });


};//END module.export 



