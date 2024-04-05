const express = require("express")
const port = 4000
const app = express()
const cors = require('cors')
const authRouter = require("./Routes/auth")
const { json } = require("body-parser")
const userDate = require("./Routes/createUser")
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
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

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tmaji112@gmail.com',
      pass: 'aian ramf lxsl lavi', // Generate an app-specific password for Gmail
    },
  });
  
  // Email sending endpoint
  app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: 'tmaji112@gmail.com',
      to,
      subject,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send('Error sending email');
      } else {
        res.send('Email sent successfully');
      }
    });
  });

mongoose.connect("mongodb+srv://tanmay:tanmay@rentalarc.ikw3zdh.mongodb.net/RentalArc")
.then(() => {
    app.listen(port ,  () => {
        console.log(`Server started at port ${port}`)
    })
})
.catch((error) => {
    console.log(error)
})
