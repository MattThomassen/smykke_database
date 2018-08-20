const express = require ('express');
const bodyParser = require("body-parser")
const path = require ('path');
const app = express();

app.set('view engine', 'ejs'); 
app.use(express.static('public')); 
app.use('/static', express.static('public')); 
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

require('./routes/index')(app);


app.listen(3000, (req, res) => {
    console.log("Serveren er startet på http://localhost:3000")
})