const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    amount : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    orderData : {
        type : Array,
        required : true
    },
    propertyId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model("Subscription" , Schema)