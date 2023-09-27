// sk_test_51Nut2vSD0LHxrw0bBSUzZpKEGTrtUo8z2tTeLgbjSNGNP7fjTVenPmPLN0IXP9Nq5hBERrSqDou2fsyhFgFEcvjt00DqoTKIcb
// coffee: price_1Nut7pSD0LHxrw0bNQjQZu5L
// Sunglasses: price_1NutCkSD0LHxrw0bSqzn9Lf8
// Camera : price_1NutDkSD0LHxrw0bZahv4nPA

const express = require('express')
var cors = require('cors');
// cors allows any ip address to access our express server

const stripe = require('stripe')('sk_test_51Nut2vSD0LHxrw0bBSUzZpKEGTrtUo8z2tTeLgbjSNGNP7fjTVenPmPLN0IXP9Nq5hBERrSqDou2fsyhFgFEcvjt00DqoTKIcb');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {
    /*
    req.body.items
    [ { id:1, quantity:3 } ]

    stripe wants
    [ { price:1, quantity:3 } ]
    */
   const items = req.body.items;
   let lineItems = [];
   items.forEach(item => {
    lineItems.push({
        price: item.id,
        quantity: item.quantity
    })
   });
   
   const session = await stripe.checkout.sessions.create({
       line_items: lineItems,
       mode: 'payment',
       success_url: 'http://localhost:3000/success',
       cancel_url: 'http://localhost:3000/cancel'
    })

    res.send(JSON.stringify({
        url: session.url
    }));

});

app.listen(4000, ()=>{
    
})