import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { Header } from '../header/header';
import axios from 'axios';

export const Displayproperty = () => {
  const location = useLocation();
  const receivedData = location.state.id;
  const [propertyData, setPropertyData] = useState(null);
  const [propertyimage, setPropertyImage] = useState(null);
  const compair = localStorage.getItem("userId")
  const [toCompair,settoCompair] = useState();
  const [checklist,setchecklist] = useState(" ");
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();

  const checkwishlist = async () => {
    try {
      const response = await axios.post("http://localhost:4000/Wishlist/check",{"userId" : localStorage.getItem("userId")});
      const ids = response.data.objectid;
      for(const id of ids){
        if(id == receivedData){
          setchecklist(response.data.message)
        }
      }
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  }

  // Function to fetch property data from the API
  const fetchPropertyData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/property/displayproperty",{"id" : receivedData});
      setPropertyData(response.data);
      setPropertyImage(response.data.propertyimage.images)
      settoCompair(response.data.propertydata.userId)
      checkwishlist()
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  // Fetch property data on component mount
  useEffect(() => {
    fetchPropertyData();
  }, [rerender]);

  const addToCompaire = async () => {
    setRerender(!rerender)
    await axios.post("http://localhost:4000/Wishlist/wishlistadd",{"userId" : localStorage.getItem("userId"), "itemId" : receivedData})
  }

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
        { (compair != toCompair) ?  <div> <button style={{color : "orange"}}>{(checklist != "available") ? <h5 onClick={addToCompaire}>add To Compaire</h5> : <h5 onClick={() => {navigate("/wishlist")}}>Already added to wishlist</h5> }</button>
        <button style={{color : "green"}} onClick={() => navigate("/rent")}><h5>proced for Rent</h5></button> </div> : <button>Update data</button>}
      </div>
    </div>
    
  );
};