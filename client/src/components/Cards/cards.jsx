import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Cards/Cards.css';
import { useNavigate } from 'react-router-dom';
const Cards = ({Title, noofbedrooms , id , NoBathRoom , Amount}) => {
  const baseUrl = import.meta.env.VITE_PROD_BASE_URL
  const navigate = useNavigate();
  const [image,setImages] = useState([])
  const [location,setlocation] = useState("")
  useEffect(() => {
    axios.post(`${baseUrl}/property/imagesfromdb`, {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    axios.post(`${baseUrl}/property/locationdb`, {"id" : id})
    .then((res) => {
      setlocation(res.data.propertyid.locality+", "+res.data.propertyid.city)
    })
    })
  },[])

const validate = (e) => {
  (localStorage.getItem("userId")) ? navigate('/details' , {state : {id : e.target.id}}) : alert("you need to Signin")
}

  return(
    <>
  <div class="property-card">
    <img src={image} alt="Property Image"/>
    <div class="property-details">
      <h2>{Title}</h2>
      <p><i class="fas fa-map-marker-alt"></i> {location}</p>
      <p><i class="fas fa-bed"></i> {noofbedrooms} Bedrooms</p>
      <p><i class="fas fa-bath"></i> {NoBathRoom} Bathrooms</p>
      <p><i class="fas fa-rupee-sign"></i> Price: ₹{Amount} per month</p>
      <button className='bok_btn' id={id} onClick={validate}>Book Now</button>
    </div>
  </div>
    </>
  )
}

export default Cards
