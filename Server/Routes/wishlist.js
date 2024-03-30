const express = require('express');
const router = express.Router();
const PropertyModel = require('../models/Property')

const Wishlist = require('../models/wishlist');

router.post('/check', async (req,res) => {
  try {
    const { userId } = req.body;
    let result = await Wishlist.findOne({userId});
    let objectid = result.itemId;
    res.status(201).json({"objectid" : objectid , "message" : "available"})
  } catch (error) {
    res.status(400).json({ error });
  }
    
})

router.post('/', async (req,res) => {

  const getDataForObjectID = async (objectId) => {
    try {
      const data = await PropertyModel.findById(objectId)
      return data;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  try {
    const { userId } = req.body;
    const result = await Wishlist.findOne({userId});
    const objectIds = result.itemId;
    const responseData = [];
    for (const objectId of objectIds) {
      const data = await getDataForObjectID(objectId);
      if (data) {
        responseData.push(data);
      }
    }
    res.json(responseData);
  } catch (error) {
    res.status(400).json({ error });
  }
})

router.post('/wishlistadd', async (req, res) => {
    try {
      const { userId, itemId } = req.body;
      let existing = await Wishlist.findOne({ userId });
      if (existing) {
        existing.itemId.push(itemId);
        existing = await existing.save();
      } else {
        existing = await Wishlist.create({ userId , itemId });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.delete('/delete' , async (req,res) => {
    const { userId, itemId } = req.body;
    let wishlist = await Wishlist.findOne({ userId });
    let data = wishlist.itemId;
    const itemIdToDelete = itemId;
    
    data = data.filter(itemId => itemId !== itemIdToDelete);
    const update = {
        itemId : data
    }
    const filter = {
        userId : userId
    }
    await Wishlist.findOneAndUpdate(filter, update , {
        new: true
      });
})

module.exports = router;