require('dotenv').config()
const express = require("express")
const cron = require("node-cron")
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
const PaymentModel = require('./models/payment')
const connectionString = process.env.MONGODB_CONNECTION_STRING
const razorpayApiKey = process.env.RAZORPAY_API_KEY
const razorpaySecretKey = process.env.RAZORPAY_SECRET_KEY
const Pass = process.env.GOOGLE_PASS_KEY
const email = process.env.GOOGLE_EMAIL

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
    key_id: razorpayApiKey,
    key_secret: razorpaySecretKey,
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
      user: email,
      pass: Pass, // Generate an app-specific password for Gmail
    },
  });
  
  // Email sending endpoint
  app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: email,
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

  cron.schedule('0 0 * * *', async() => {
    try{
      await PaymentModel.deleteMany({ endDate: {$lt : new Date()}});
      console.log('Data deleted successfully.')
    } catch (err){
      console.log('error deleting data:',err)
    }
  })

mongoose.connect(connectionString)
.then(() => {
    app.listen(port ,  () => {
        console.log(`Server started at port ${port}`)
    })
})
.catch((error) => {
    console.log(error)
})
