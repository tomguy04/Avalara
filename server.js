const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')


// Express set up
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'));

app.engine('.hbs', exphbs.create({extname:'.hbs', defaultLayout:'main.hbs'}).engine);
app.set('view engine', '.hbs');

// Routes
app.get('/', (req, res) => res.render('home'));

app.post('/submit-form', (req,res)=>{
    const addressLine1 = req.body.addressLine1;
    const state = req.body.state;
    const zipCode = req.body.zipCode;
    const amount = req.body.amount;

    console.log(addressLine1, state, zipCode, amount);

    res.end();
})

// Start server
app.listen(3000, () => console.log('App running at http://localhost:3000'));
