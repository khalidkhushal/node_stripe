const express = require(`express`);
const { products, orders } = require(`../database/model`)
const stripe = require(`stripe`)(`sk_test_51KZHppH2Xi1v1gEniDmfrKZqPo9msZVJfi7ZljJUDP9VaiUVtqDhMPwBlro1StbbuUywj3bqhrFrmUNKeYgXQLVs00J4vVItpZ`)

const router = express.Router();

//creating home route
router.get(`/`, async(req, res) => {
    try {
        const product = await products.findAll();
        res.render(`products`, { product: product, stripepubkey: process.env.stripepubkey });
    } catch (err) {
        console.log(err)
    }
})

//creating query route by id
router.get("/product", async(req, res) => {
    const id = req.query.id;
    try {

        const product = await products.findOne({
            where: { id }
        })
        res.render(`byid`, { product: product });

    } catch (err) {
        console.log(err)
    }

})

//creating route for params by id
router.get("/product/:id", async(req, res) => {
    const id = req.params.id;
    try {

        const product = await products.findOne({
            where: { id }
        })
        res.render(`byid`, { product: product });

    } catch (err) {
        console.log(err)
    }

})

// creating route just to enter data by postman
router.post(`/data`, async(req, res) => {
    const { title, description, image, price } = req.body;
    try {
        const product = await products.create({ title, description, image, price });
        res.send(product)
    } catch (err) {
        console.log(err)
    }
})

//creating stripe request from frontend
router.post(`/paybystripe`, async(req, res) => {
    const { total, id, title, image, quantity } = req.body

    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: [`card`],
            mode: `payment`,
            line_items: [{
                price_data: {
                    currency: `usd`,
                    product_data: {
                        name: title,
                    },
                    unit_amount: total,
                },
                quantity: quantity,
            }],
            success_url: `${process.env.SERVER_URL}/views/success.ejs`,
            cancel_url: `${process.env.SERVER_URL}/views/cancel.ejs`
        })

        const order = await orders.create({ product_id: id, total, stripe_id: session.id, status: session.status }).catch(err => { console.log(err); })

        res.send({ id: session.id })
    } catch (err) {
        console.log(err)
    }

})



module.exports = router;