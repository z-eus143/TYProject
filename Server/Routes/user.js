const express = require("express")
const UserRouter = express.Router();
const userModel = require('../models/User')
const PropertyModel = require('../models/Property')
const PaymentModel = require('../models/payment');
const payment = require("../models/payment");

UserRouter.post("/User", async (req,res) => {
    try {
        const {id} = req.body;
        if (id) {
            const user = await userModel.findOne({ _id : id});
            res.status(201).json({user: user})
        } else {
            res.status(400).json({"message" : "Something went Wrong 1"})
        }
    } catch (error) {
        res.status(400).json({"message" : "Something went Wrong 2"})
    }
}) 

UserRouter.post("/Userdata", async (req,res) => {
    try {
        let result = await userModel.find();
        res.json(result)
    } catch (error) {
        res.status(400).json({"message" : error})
        console.log(error)
    }
}) 

UserRouter.post("/Userhosted", async (req,res) => {
    try {
        const {id} = req.body;
        if (id) {
            const user = await PropertyModel.find({ userId : id});
            const booking = await payment.find({ userId : id})
            res.status(201).json({user , booking})
        } else {
            res.status(400).json({"message" : "Something went Wrong 1"})
        }
    } catch (error) {
        res.status(400).json({"message" : "Something went Wrong 2"})
    }
}) 

UserRouter.post("/Payment", async (req,res) => {
    try {
        const {amount , endDate , orderdata , startDate , Vaccancy} = req.body;
        const existingproperty = await PropertyModel.find({_id : req.body.pro_id})
        const Vaccancyincrement = Vaccancy+1;
        await PropertyModel.findByIdAndUpdate(req.body.pro_id, {NoVacancy : Vaccancyincrement} , { new : true })
        if(existingproperty){
            await PaymentModel.create({
                amount : amount,
                endDate : endDate,
                startDate : startDate,
                orderData : orderdata,
                propertyId : req.body.pro_id,
                userId : req.body.use_id
            })
            res.status(201).json({"message" : "Created"}) 
        }
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

module.exports = UserRouter;