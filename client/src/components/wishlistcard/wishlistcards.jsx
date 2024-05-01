import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../wishlistcard/Cards.css';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_PROD_BASE_URL
export const WishlistCards = ({Title, description,noofbedrooms, id , Category , amount}) => {
  const navigate = useNavigate();
  const [image,setImages] = useState([])
  const [location,setlocation] = useState("")
  useEffect(() => {
    axios.post(`${baseUrl}/property/imagesfromdb`, {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    })
    axios.post(`${baseUrl}/property/locationdb`, {"id" : id})
    .then((res) => {
      setlocation(res.data.propertyid.locality+", "+res.data.propertyid.city)
    })
  },[])

  const deletedata = async () => {
      await axios.post(`${baseUrl}/wishlist/delete` , {"userId" : localStorage.getItem("userId") , "itemId" : id})
  }
  return(
    <div>
    <div class="wishlist_container">
    <h1>{Category}</h1>
    <div class="listing">
      <img style={{height : "130px", width : "220px"}} src={image} alt="Listing 1"/>
      <div>
      <div><h2>{Title}</h2></div>
      <div><p>Location: {location}</p></div>
      <div><p>Price per month: ₹{amount}</p></div>
      <div><button class="remove-button" style={{marginRight : "20px"}} onClick={deletedata}><i class="fas fa-trash-alt"></i> Remove</button><button class="remove-button" id={id} onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}><i class="fas fa-info-circle"></i> View Details</button></div>
      </div>
    </div>
  </div>
  </div>
  )
}


