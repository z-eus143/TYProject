const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    propertyId : {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name : {
      type : String,
      required: true
    },
    image : {
      type : String,
      required : false
    },
    note : {
      type : String,
      required: true
    }
  }, {timestamps : true})
  module.exports = mongoose.model("ReviewModel",Schema);