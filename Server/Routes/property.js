const express = require('express')
const PropertyData = express.Router()
const PropertyModel = require('../models/Property')
const usermodel = require('../models/User')
const locationmodel = require('../models/location')
const imageModel = require('../models/image')
const subscriptionModel = require('../models/subscription')

PropertyData.post("/propertydata", async(req,res) => {
    try {
        const {Property,
        Bedrooms,
        Bathrooms,
        Occupancy,
        Description,
        Amenities,
        Rules,
        Additional} = req.body.formData;
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
                userId : id
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
        const {Flat,street,locality,city,area} = req.body.formData;
        const id = req.body.id;
        const existingproperty = await PropertyModel.findOne({_id : id})
        if(existingproperty){
            const result = await locationmodel.create({
                Flat : Flat,
                street : street,
                locality : locality,
                city : city,
                area : area,
                propertyId : id
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
        const {amount , startDate , endDate} = req.body;
        const existingproperty = await subscriptionModel.find({_id : req.body.id})
        if(existingproperty){
            const result = await subscriptionModel.create({
                amount : amount,
                startDate : startDate,
                endDate : endDate,
                propertyId : req.body.id
            })
        }
    } catch (error) {
        res.status(400).json({"message" : "Error"})
        console.log(error)
    }
})
module.exports = PropertyData;
