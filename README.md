# smykke_database

Af Marie &amp; Matt


# Noter
Test routes direkte i browseren (i URL'en) : 
console.log(rows); tester om der bliver vist sql på siden
res.send()  tester om der bliver vist sql på siden uden at der er en html side endnu
console.log(rows);

createOne: function (navn, pris, kategori, beskrivelse, metal) {
        const values = [navn, pris, kategori, beskrivelse, metal]
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO smykker
            SET smykke_id = ?,
            navn = ?,
            pris = ?,
            fk_kategori = ?, 
            beskrivelse = ?, 
            fk_metal = ?`;
            db.query(sql, values, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    },


    createOne: function () {
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO smykker
            ('smykke_id', 'navn', 'pris', 'fk_kategori', 'beskrivelse', 'fk_metal')
            VALUES (NULL, ?, ?, ?, ?, ?);`;
            db.query(sql, function (err, result) {
                if (err) reject(err)

                resolve(result);
            });

        })
    }


<% redigere.forEach(produkt => { %>
            <form method="POST" action="/redigere/<%= produkt.smykke_id %>">
                <div class="form-group row">
                    <label for="example-text-input">Navn:</label>
                    <input type="text" name="navn" id="example-text-input" class="form-control" value="<%= produkt.navn %>">
                </div>

                <div class="form-group row">
                    <label for="example-text-input">Pris:</label>
                    <input type="text" name="pris" id="example-text-input" class="form-control" value="<%= produkt.pris %>">
                </div>

                <div class="form-group row">
                    <label for="exampleTextarea">Beskrivelse:</label>
                    <textarea type="text" name="beskrivelse" class="form-control" id="exampleTextarea" rows="3"><%= produkt.beskrivelse %></textarea>
                </div>

                <div class="form-group row">
                    <label for="exampleSelect1">Kategori:</label>
                    <select id="kategori" name="kategori" type="text"">
                        <% kategori.forEach(function(kat){ %>

                            <option value="<%= kat.kategori_id %>">
                                <%= kat.navn %>
                            </option>
                            <% })  %>
                    </select>
                </div>

                <div class="form-group row">
                    <label for="exampleSelect1">Metal:</label>
                    <select id="metal" name="metal" type="text"">
                        <% metal.forEach(function(met){ %>

                            <option value="<%= met.metal_id %>">
                                <%= met.navn %>
                            </option>
                            <% })  %>
                    </select>
                </div>

                <button type="submit" class="btn btn-danger d-flex justify-content-center col-md-4 m-2"">GEM</button>

            </form>
            <% }) %>
            
            .toString() 
            
    render for at genindlæse siden, fetch for at køre siden asynchron uden at den refresher

    når du refere til client side der peger på en http element skal der være en / foran