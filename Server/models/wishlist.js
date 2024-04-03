const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      itemId: [{
        type: String,
      }]
}, {timestamps : true})

module.exports = mongoose.model("wishlistModel",wishlistSchema);
