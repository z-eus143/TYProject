import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { Header } from '../header/header';
import '../dispalypropertydetails/display.css'
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
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
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

  // return (
  //   <div>
  //     {propertyData && (
  //       <div>
  //         <Header/>
  //         <div style={{paddingTop : "100px"}} onClick={ () => { navigate("/")}}><button>Back</button></div>
  //         <h2>Received Data:</h2>
  //         {/* Render property type */}
  //         <h1>{propertyData.propertydata.Type}</h1>

  //         {/* property images  */}

  //         <div>
  //         {
  //           propertyimage.map((image, index) => {
  //             return<div key={index} style={{display : 'inline-flex' , justifyContent : 'center'}}><img style={{height : "300px", width : "300px" , borderRadius : "50px"}} src={image} alt="image" className='Card-Img'/></div>
  //           })
  //         }
  //         </div>
  //         {/* Render other property details */}


  //         <hr></hr>
  //         <div  className='prop-details'>
  //           <div>
  //         Number of Bedrooms: {propertyData.propertydata.NoBedRoom}<br></br>
  //         Number of Bathrooms: {propertyData.propertydata.NoBathRoom}<br></br>
  //         Number of Occupancy: {propertyData.propertydata.NoOccupancy}<br></br>
  //         Amenities: {propertyData.propertydata.Amenities}<br></br>
  //         </div>
          
  //         {/* Render property location */}
  //       <div>
  //       Flat: {propertyData.propertylocation.Flat}<br></br>
  //       Street: {propertyData.propertylocation.street}<br></br>
  //       Locality: {propertyData.propertylocation.locality}<br></br>
  //       City: {propertyData.propertylocation.city}<br></br>
  //       Area: {propertyData.propertylocation.area}
  //       </div>
  //         </div>
  //         <hr></hr>

          
  //         {/* user details */}
  //         <div className='user-datails'>
  //         <img style={{height : "100px", width : "100px" , borderRadius : "50px"}} src={propertyData.Userdata.image} alt="image" className='Card-Img'/>
          
  //         <h1>OwnerName: {propertyData.Userdata.firstname +" "+ propertyData.Userdata.lastname}</h1>
  //         <h1>Contact Details : {propertyData.Userdata.mobileno + " / " + propertyData.Userdata.email}</h1>
  //         </div>

  //         </div>
  //     )}
  //     <div>
  //       { (compair != toCompair) ?  <div> <button style={{color : "orange"}}>{(checklist != "available") ? <h5 onClick={addToCompaire}>add To Compaire</h5> : <h5 onClick={() => {navigate("/wishlist")}}>Already added to wishlist</h5> }</button>
  //       <button style={{color : "green"}} onClick={() => navigate("/rent")}><h5>proced for Rent</h5></button> </div> : <button>Update data</button>}
  //     </div>
  //   </div>
    
  // );
return(<>
{propertyData && (
  <div>
  <Header/>
  <div style={{paddingTop : "7rem"}}></div>
  <h1 style={{paddingBottom : "20px"}}>{propertyData.propertydata.Type}</h1>
  <div class="container" style={{overFlow: "auto" , textAlign : "left"}}>
    <div class="property-details" style={{float : 'left' , textAlign : "left"}}>
    <div class="image-gallery">
  <div class="big-image">
    <img className='big_image' src={propertyimage[0]} alt="Property Image 1"/>
  </div>
  <div class="big-image">
    <img  className='big_image' src={propertyimage[1]} alt="Property Image 2"/>
  </div>
  <div class="image">
    <img src="https://via.placeholder.com/800x400" alt="Property Image 3"/>
  </div>
  <div class="image">
    <img src="https://via.placeholder.com/800x400" alt="Property Image 4"/>
  </div>
  <div class="image">
    <img src="https://via.placeholder.com/800x400" alt="Property Image 5"/>
  </div>
</div>
<div class="property-info">
        <h1>Property-info</h1>
        <p>Number of Bedrooms: {propertyData.propertydata.NoBedRoom}</p>
        <p>Number of Bathrooms: {propertyData.propertydata.NoBathRoom}</p>
        <p>Number of Occupancy: {propertyData.propertydata.NoOccupancy}</p>
        <p>Amenities: {propertyData.propertydata.Amenities}</p>
        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna hendrerit, commodo metus id, dictum odio. Ut auctor odio id nisl mattis efficitur.</p>
        <h1>Address</h1>
        <p>Flat: {propertyData.propertylocation.Flat}</p>
        <p>Street: {propertyData.propertylocation.street}</p>
        <p>Location: {propertyData.propertylocation.locality}</p>
        <p>City: {propertyData.propertylocation.city}</p>
        <p>Area: {propertyData.propertylocation.area}</p>
        <p>Price per month: {propertyData.propertydata.RentAmount} ₹</p>
      </div>
    </div>
    <div class="book-now">
      <h2>Book Now</h2>
      <form class="booking-form">
        <label for="check-in">Start date:</label>
        <input type="date" id="check-in" name="check-in" required min={`${year}-${month}-${day}`}/><br/>
        <label for="check-out">End date:</label>
        <input type="date" id="check-out" name="check-out" required min={`${year}-${month}-${day}`}/><br/>
         { (compair != toCompair) ?  <> <button class="book-button" onClick={addToCompaire}>{(checklist != "available") ? <><i class="fas fa-regular fa-heart"></i> add To Compaire</> : <h5 onClick={() => {navigate("/wishlist")}}><i class="fas fa-regular fa-heart"></i> Already added to wishlist</h5> }</button>
         <button class="book-button" onClick={() => navigate("/rent")}><i class="fas fa-calendar-plus" ></i> proced for Rent</button> </> : <button class="book-button">Update data</button>}
      </form>
    </div>
  </div></div>)}</>)
};