const express = require ('express');
const bodyParser = require('body-parser')
const router = express.Router();
const path = require ('path');
const app = express();
const morgan = require('morgan')

app.set('view engine', 'ejs'); 

app.use(express.static('public')); 
app.use('/static', express.static('public')); 
app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))

require('./routes/index')(app);


app.listen(3000, (req, res) => {
    console.log("Serveren er startet på http://localhost:3000")
})