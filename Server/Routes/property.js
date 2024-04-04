const express = require('express')
const PropertyData = express.Router()
const PropertyModel = require('../models/Property')
const usermodel = require('../models/User')
const locationmodel = require('../models/location')
const imageModel = require('../models/image')
const subscriptionModel = require('../models/subscription')
const BookingModel = require('../models/payment')
const ReviewModel = require('../models/review')

PropertyData.post("/propertydata", async(req,res) => {
    try {
        const {
        Property,
        Bedrooms,
        Bathrooms,
        Occupancy,
        Description,
        Amenities,
        Rules,
        Additional,
        RentAmount,
        RentMethod,
        Category} = req.body.formData;
        const id = req.body.id;
        const existinguser = await usermodel.findOne({_id : id})
        if(existinguser){
            const result = await PropertyModel.create({
                Type : Property,
                NoBedRoom : Bedrooms,
                NoBathRoom : Bathrooms,
                NoOccupancy : Occupancy,
                Description : Description,
                Amenities : Amenities,
                HouseRules : Rules,
                Additionalinfo : Additional,
                RentAmount : RentAmount,
                RentMethod : RentMethod,
                userId : id,
                Category : Category,
                NoVacancy : 0
            });
            res.status(201).json({"message" : "Created" , id : result._id})
        } else {
            res.status(400).json({"message" : "Wrong data"})
        }
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})


PropertyData.get("/properties", async(req,res) => {
    try {
        const properties = await PropertyModel.find()
        res.status(200).json({properties})
    } catch (error) {
        res.status(400).json({"message" : "Error"})
    }
})

PropertyData.post("/property", async(req,res) => {
    try {
        const propertyid = await PropertyModel.find({_id : req.body.id})
        res.status(200).json({propertyid})
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

PropertyData.post("/locationdata", async(req,res) => {
    try {
        const {Flat,street,locality,city,area,StateProvience} = req.body.formData;
        const id = req.body.id;
        const existingproperty = await PropertyModel.findOne({_id : id})
        if(existingproperty){
            const result = await locationmodel.create({
                Flat : Flat,
                street : street,
                locality : locality,
                city : city,
                area : area,
                propertyId : id,
                StateProvience : StateProvience
            });
            res.status(201).json({"message" : "Created" , id : result._id})
        } else {
            res.status(400).json({"message" : "Wrong data"})
        }
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

PropertyData.post("/location", async(req,res) => {
    try {
        const propertyid = await locationmodel.find({_id : req.body.id})
        res.status(200).json({propertyid})
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

PropertyData.post("/locationdb", async(req,res) => {
    try {
        const propertyid = await locationmodel.findOne({propertyId : req.body.id})
        res.status(200).json({propertyid})
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

PropertyData.post("/images", async(req,res) => {
    try {
        const images = req.body.images;
        const existinguser = await PropertyModel.find({propertyId : req.body.id})
        if(existinguser){
            const result = await imageModel.create({
                images : images,
                propertyId : req.body.id
            });
        res.status(201).json({"message" : "Created" , id : result._id})
        }else {
            res.status(400).json({"message" : "Wrong data"})
        }
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    } 
})

PropertyData.post("/imagesfromdb", async(req,res) => {
    try {
        const images = await imageModel.find({propertyId : req.body.id})
        res.status(200).json({images , "message" : "valid"})
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

PropertyData.post("/subscribe", async(req,res) => {
    try {
        const {amount , endDate , orderdata} = req.body;
        const existingproperty = await subscriptionModel.find({_id : req.body.id})
        if(existingproperty){
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var formattedDate = year + "-" + month + "-" + day;
            await subscriptionModel.create({
                amount : amount,
                endDate : endDate,
                startDate : formattedDate,
                orderData : orderdata,
                propertyId : req.body.id
            })
            res.status(201).json({"message" : "Created"}) 
        }
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})

PropertyData.post("/displayproperty" , async(req,res) => {
    try {
        const propertydata = await PropertyModel.findOne({_id : req.body.id})
        const propertylocation = await locationmodel.findOne({propertyId : req.body.id})
        const propertyimage = await imageModel.findOne({propertyId : req.body.id})
        const Booking = await BookingModel.findOne({propertyId : req.body.id})
        let bookeddata = null
        if(Booking){
            const id = Booking.userId;
            bookeddata = await usermodel.findOne({"_id" : id})
        }
        const Review = await ReviewModel.find({propertyId : req.body.id})
        const userid = propertydata.userId;
        const Userdata = await usermodel.findOne({_id : userid})
        res.status(200).json({propertydata,propertylocation,propertyimage,Userdata,Booking,Review,bookeddata})
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})
module.exports = PropertyData;
