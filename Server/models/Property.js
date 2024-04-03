const mongoose = require('mongoose')


// Property Schema

const RoomSchema = mongoose.Schema({
    Category : {
        type : String,
        required : true
    },
    Type : {
        type : String,
        required : true
    },
    NoBedRoom : {
        type : String,
        required : true
    },
    NoBathRoom : {
        type : String,
        required : true
    },
    NoOccupancy : {
        type : String,
        required : true
    },NoVacancy : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Amenities : {
        type : String,
        required : true
    },
    HouseRules : {
        type : String,
        required : true
    },
    Additionalinfo : {
        type : String,
        required : true 
    },
    RentAmount : {
        type : String,
        required : true 
    },
    RentMethod : {
        type : String,
        required : true 
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
} , {timestamps : true})


const SharedRoomSchema = mongoose.Schema({

})

const WholeRoomSchema = mongoose.Schema({

})


// Models
module.exports = mongoose.model("property",RoomSchema);
