

const db = require('.././config/sql').connect();

module.exports = (app) => {
    //viser alle produkter når siden loades
    app.get('/', function (req, res) {
        db.query(`
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
        FROM(( arrangement AS a
            INNER JOIN kategori AS k
            ON fk_kategori = k.kategori_id)
            INNER JOIN event AS e
            ON e.fk_arrangement = a.arrangement_id)
            `, (error, rows) => {
                db.query('SELECT * FROM kategori', function (err, data_kategori) {
                    res.render('pages/index', {
                        side: "index",
                        arrangement: rows,
                        kategori: data_kategori
                    });
                })
            });
    });

    app.get('/arrangement', function (req, res) {
        db.query(`
            SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
            FROM(( arrangement AS a
                INNER JOIN kategori AS k
                ON fk_kategori = k.kategori_id)
                INNER JOIN event AS e
                ON e.fk_arrangement = a.arrangement_id)
                `, (error, rows) => {
                res.json(rows);
            });
    });

    // henter arrangementer i bestem kategori
    app.get('/arrangement/:id', function (req, res) {
        let category_id = req.params['id'];
        let sql = `
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                FROM(( arrangement AS a
                    INNER JOIN kategori AS k
                    ON fk_kategori = k.kategori_id)
                    INNER JOIN event AS e
                    ON e.fk_arrangement = a.arrangement_id)
                    WHERE k.kategori_id = ${req.params['id']}`;
        if (category_id == 0) {
            db.query(`SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                                FROM(( arrangement AS a
                                INNER JOIN kategori AS k
                                ON fk_kategori = k.kategori_id)
                                INNER JOIN event AS e
                                ON e.fk_arrangement = a.arrangement_id)`, (error, rows) => {
                    res.json(rows);
                })
        } else {
            db.query(sql, (error, rows) => {
                res.json(rows);
            });
        }

    });


    //rendere admin side
    app.get('/admin', function (req, res) {
        db.query(`
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato, a.beskrivelse AS beskrivelse
        FROM(( arrangement AS a
            INNER JOIN kategori AS k
            ON fk_kategori = k.kategori_id)
            INNER JOIN event AS e
            ON e.fk_arrangement = a.arrangement_id)
            `, (error, rows) => {
                db.query('SELECT * FROM kategori', function (err, data_kategori) {
                    res.render('pages/admin', {
                        side: "admin",
                        arrangement: rows,
                        kategori: data_kategori
                    });
                })
            });
    });

    //henter bestemt produkt i admin panel
    app.get('/admin/:id', function (req, res) {
        let category_id = req.params['id'];
        let sql = `
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                FROM(( arrangement AS a
                    INNER JOIN kategori AS k
                    ON fk_kategori = k.kategori_id)
                    INNER JOIN event AS e
                    ON e.fk_arrangement = a.arrangement_id)
                    WHERE k.kategori_id = ${req.params['id']}`;
        if (category_id == 0) {
            db.query(`SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                                FROM(( arrangement AS a
                                INNER JOIN kategori AS k
                                ON fk_kategori = k.kategori_id)
                                INNER JOIN event AS e
                                ON e.fk_arrangement = a.arrangement_id)`, (error, rows) => {
                    res.json(rows);
                })
        } else {
            db.query(sql, (error, rows) => {
                res.json(rows);
            });
        }

    });

    app.get('/login', (req, res) => {
        res.render('pages/login', {
            side:'login'
        })
    })

    //henter et bestemt arrangement
    app.get('/enArrangement/:id', function (req, res) {
        db.query(`
        SELECT *
        FROM arrangement
        WHERE arrangement_id = ${req.params.id}`, (error, rows) => {
                res.json(rows);
            });
    });

    //render redigere
    app.get('/redigere/:id', function (req, res) {
        db.query(`SELECT a.*, a.beskrivelse AS besk, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
            FROM(( arrangement AS a
            INNER JOIN kategori AS k
            ON fk_kategori = k.kategori_id)
            INNER JOIN event AS e
            ON e.fk_arrangement = a.arrangement_id) WHERE arrangement_id = ${req.params.id}`, (error, rows) => {
                db.query(`SELECT * FROM kategori`, function (error1, rows1) {
                    res.render('pages/redigere', {
                        side: "redigere",
                        redigere: rows,
                        kategori: rows1
                    });
                })
            });
    });

    // kan kun updatere fra arrangment tabel
    app.post('/redigere/:id', function (req, res) {
        db.query(`UPDATE arrangement
        SET navn = ?,
        beskrivelse = ?,
        varighed = ?
        WHERE arrangement_id = ${req.params.id}`, [req.body.navn, req.body.beskrivelse, req.body.varighed, req.body.pris], (error, rows) => {
                if (error) {
                    console.log("Error:" + error);
                } else {
                    res.redirect("/admin")
                }
            })
    })

    //Sletter bestemt arrangement
    app.post('/slet/:id', function (req, res) {
        db.query(`
        DELETE FROM arrangement WHERE arrangement_id = ${req.params.id}`,
            (error, rows) => {
                if (error) {
                    console.log("Error:" + error);
                } else {
                    res.redirect("back")
                }
            })
    })

    // app.post('/opret', (req, res) => {
    //     // let navn = req.body.navn;
    //     // let fk_kategori = req.body.fk_kategori;
    //     // let varighed = req.body.varighed;
    //     // let fk_billede = req.body.fk_billede;
    //     // let beskrivelse = req.body.beskrivelse;

    //     db.query(`INSERT INTO arrangement
    //     ((INNER JOIN kategori AS Kat
    //     ON fk_kategori = kat.kategori_id)
    //     INNER JOIN billede AS bill
    //     ON fk_billede = bill.billede_id)
    //     (navn,fk_kategori,varighed,fk_billede,beskrivelse)
    //     VALUES (?, ?, ?, ?, ?)`, [req.body.navn, req.body.fk_kategori, req.body.varighed, req.body.fk_billede, req.body.beskrivelse],
    //     (error, rows) => {
    //             if (error) {
    //                 console.log("Error:" + error);
    //             } else {
    //                 res.redirect("back")
    //             }
    //         })
    // })


    // app.post('/opret', (req, res) => {
    //     console.log(req.body);        
    //     db.query(`INSERT INTO arrangement(navn, fk_kategori, varighed, fk_billede, beskrivelse)
    //      VALUES (${req.body.navn}, ${req.body.fk_kategori},${req.body.varighed}, ${req.body.fk_billede},${req.body.beskrivelse})`,
    //     (error, rows) => {
    //             if (error) {
    //                 console.log( error);
    //             } else {
    //                 res.redirect("back")
    //             }
    //         })
    // })

    app.post('/opret', (req, res) => {

        var arrangement_id = req.body.arrangement_id;
        var navn = req.body.navn;
        var fk_kategori = req.body.fk_kategori;
        var varighed = req.body.varighed;
        var pris = req.body.pris;
        var fk_billede = req.body.fk_billede;
        var beskrivelse = req.body.beskrivelse;
        
        console.log(req.body);
        
        db.query("INSERT INTO `arrangement`(`arrangement_id`, `navn`, `fk_kategori`, `varighed`, `pris`, `fk_billede`, `beskrivelse`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [arrangement_id, navn, fk_kategori, varighed, pris, fk_billede, beskrivelse],(error, rows) => {
                if (error) {
                    console.log( error);
                } else {
                    res.redirect("back")
                }
            })

        // res.send();
    })


    


};//END module.export 



