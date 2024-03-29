import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { Header } from '../header/header';
import axios from 'axios';

export const Displayproperty = () => {
  const location = useLocation();
  // const [propertyData,setpropertydata] = useState(null)
  const receivedData = location.state.id;
  // State to store property data
  const [propertyData, setPropertyData] = useState(null);
  const [propertyimage, setPropertyImage] = useState(null);
  const compair = localStorage.getItem("userId")
  const [toCompair,settoCompair] = useState();
  const navigate = useNavigate();

  // Function to fetch property data from the API
  const fetchPropertyData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/property/displayproperty",{"id" : receivedData});
      setPropertyData(response.data); // Assuming response.data contains the property data
      setPropertyImage(response.data.propertyimage.images)
      settoCompair(response.data.propertydata.userId)
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  // Fetch property data on component mount
  useEffect(() => {
    fetchPropertyData();
  }, []);

  return (
    <div>
      {propertyData && (
        <div>
          <Header/>
          <div style={{paddingTop : "100px"}} onClick={ () => { navigate("/")}}><button>Back</button></div>
          <h2>Received Data:</h2>
          {/* Render property type */}
          <h1>{propertyData.propertydata.Type}</h1>
          {/* <img style={{height : "300px", width : "300px" , borderRadius : "50px"}} src={propertyData.propertyimage.images[0]} alt="image" className='Card-Img'/> */}
          {
            propertyimage.map((image, index) => {
              return<div key={index} style={{display : 'inline-flex' , justifyContent : 'center'}}><img style={{height : "300px", width : "300px" , borderRadius : "50px"}} src={image} alt="image" className='Card-Img'/></div>
            })
          }
          {/* Render other property details */}
          <h1>Number of Bedrooms: {propertyData.propertydata.NoBedRoom}</h1>
          <h1>Number of Bathrooms: {propertyData.propertydata.NoBathRoom}</h1>
          <h1>Number of Occupancy: {propertyData.propertydata.NoOccupancy}</h1>
          <h1>Amenities: {propertyData.propertydata.Amenities}</h1>
          {/* Render property location */}
          <h1>Flat: {propertyData.propertylocation.Flat}</h1>
          <h1>Street: {propertyData.propertylocation.street}</h1>
          <h1>Locality: {propertyData.propertylocation.locality}</h1>
          <h1>City: {propertyData.propertylocation.city}</h1>
          <h1>Area: {propertyData.propertylocation.area}</h1>
          <img style={{height : "100px", width : "100px" , borderRadius : "50px"}} src={propertyData.Userdata.image} alt="image" className='Card-Img'/>
          <h1>OwnerName: {propertyData.Userdata.firstname +" "+ propertyData.Userdata.lastname}</h1>
          <h1>Contact Details : {propertyData.Userdata.mobileno + " / " + propertyData.Userdata.email}</h1>
        </div>
      )}
      <div>
        { (compair != toCompair) ?  <div> <button style={{color : "orange"}}>add for compair</button>
        <button style={{color : "green"}} onClick={() => navigate("/rent")}>proced for Rent</button> </div> : <button>Update data</button>}
      </div>
    </div>
    
  );
};