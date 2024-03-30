const express = require("express")
const port = 4000
const app = express()
const cors = require('cors')
const authRouter = require("./Routes/auth")
const { json } = require("body-parser")
const userDate = require("./Routes/createUser")
const mongoose = require('mongoose')
const Razorpay = require('razorpay');
const UserRouter = require("./Routes/user")
const PropertyRouter = require("./Routes/property")
const WishlistRouter = require('./Routes/wishlist')

app.use(json({limit: '100mb'}))
app.use(cors())

app.get("/" , (req,res) => {
    res.send("Hello")
})

app.use("/auth", authRouter)
app.use("/create", userDate)
app.use("/Account", UserRouter) 
app.use("/property", PropertyRouter)
app.use('/Wishlist',WishlistRouter)


const razorpay = new Razorpay({
    key_id: 'rzp_test_8VYQBFKrK9Y2qI',
    key_secret: 'IhrijnbYDwi3vkjUkKjhQAgy',
});

app.post('/razorpay/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount, 
        currency: currency,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({ order_id: response.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Could not create order' });
    }
});

mongoose.connect("mongodb://0.0.0.0:27017/RentalArc")
.then(() => {
    app.listen(port ,  () => {
        console.log(`Server started at port ${port}`)
    })
})
.catch((error) => {
    console.log(error)
})
