import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../wishlistcard/Cards.css';
import { useNavigate } from 'react-router-dom';
export const WishlistCards = ({Title, description,noofbedrooms, id , Category}) => {
  const navigate = useNavigate();
  const [image,setImages] = useState([])
  useEffect(() => {
    axios.post("http://localhost:4000/property/imagesfromdb", {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    })
  },[])

  const deletedata = async () => {
      await axios.post("http://localhost:4000/wishlist/delete" , {"userId" : localStorage.getItem("userId") , "itemId" : id})
  }
  return(
    <div>
    <div class="wishlist_container">
    <h1>{Category}</h1>
    <div class="listing">
      <img style={{height : "130px", width : "220px"}} src={image} alt="Listing 1"/>
      <div>
      <div><h2>{Title}</h2></div>
      <div><p>Location: Beachfront</p></div>
      <div><p>Price per month: $100</p></div>
      <div><button class="remove-button" style={{marginRight : "20px"}} onClick={deletedata}><i class="fas fa-trash-alt"></i> Remove</button><button class="remove-button" id={id} onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}><i class="fas fa-info-circle"></i> View Details</button></div>
      </div>
    </div>
  </div>
  </div>
  )
}


