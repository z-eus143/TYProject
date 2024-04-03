const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
    Flat : {
        type : String,
        required : true
    },
    street : {
        type : String,
        required : true
    },
    locality : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    area : {
        type : String,
        required : true
    },
    propertyId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    StateProvience : {
        type : String,
        required : true 
    }
} , {timestamps : true})

module.exports = mongoose.model("Location",LocationSchema);