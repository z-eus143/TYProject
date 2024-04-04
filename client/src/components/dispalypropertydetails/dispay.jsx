import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { Header } from '../header/header';
import '../dispalypropertydetails/display.css'
import axios from 'axios';
const baseUrl = import.meta.env.VITE_PROD_BASE_URL

export const Displayproperty = () => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    fetchPropertyData();
  }, [rerender]);
  const location = useLocation();
  const receivedData = location.state.id;
  const [propertyData, setPropertyData] = useState(null);
  const [propertyimage, setPropertyImage] = useState(null);
  const [reviews, setreviews] = useState([]);
  const compair = localStorage.getItem("userId")
  const [toCompair,settoCompair] = useState();
  const [checklist,setchecklist] = useState(" ");
  const [name,setname] = useState();
  const [note,setnote] = useState();
  const [id,setid] = useState();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const checkwishlist = async () => {
    try {
      const response = await axios.post(`${baseUrl}/Wishlist/check`,{"userId" : localStorage.getItem("userId")});
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
      const response = await axios.post(`${baseUrl}/property/displayproperty`,{"id" : receivedData});
      setPropertyData(response.data);
      setPropertyImage(response.data.propertyimage.images)
      settoCompair(response.data.propertydata.userId)
      setreviews(response.data.Review)
      setid(response.data.propertydata.userId)
      checkwishlist()
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  const calculateTotalDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);   
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();   
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    let totalMonths;
    if (endYear > startYear) {
        totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    } else {
        totalMonths = endMonth - startMonth;
    }
    const amount = propertyData.propertydata.RentAmount
    navigate("/rent" , {state : {id : receivedData, startDate : startDate , endDate : endDate , totalMonths : totalMonths , amount : amount , city : propertyData.propertylocation.city , locality : propertyData.propertylocation.locality , Vaccancy : propertyData.propertydata.NoVacancy}})  
};

  const addToCompaire = async () => {
    await axios.post(`${baseUrl}/Wishlist/wishlistadd`,{"userId" : localStorage.getItem("userId"), "itemId" : receivedData})
    .then((res) => {
      setRerender(!rerender)
    })
  }
  const addReview = async () => {
    await axios.post(`${baseUrl}/Wishlist/addReview`,{"userId" : localStorage.getItem("userId"), "itemId" : receivedData , "Name" : name , "Note" : note})
    .then((res) => {
      setRerender(!rerender)
    })
  }
  const Afterbooked = () => {
    return(<>
      <h1>Already Booked</h1>
      <div>
      {(checklist != "available") ? <button class="book-button" onClick={addToCompaire}><i class="fas fa-regular fa-heart"></i> add To Compaire</button> : <button class="book-button" onClick={() => {navigate("/wishlist")}}> <h5><i class="fas fa-regular fa-heart"></i> Already added to wishlist</h5> </button>}
      </div>
      </>
    )
}
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
        {(propertyData.propertydata.Category == "Shared Room") && <p>Number of Vaccancy: {propertyData.propertydata.NoOccupancy - propertyData.propertydata.NoVacancy}</p>}
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
      {(localStorage.getItem("userId") == id && propertyData.bookeddata) ? 
      <div class="property-info-user">
      <h1>Rented By</h1>
      <div style={{display : 'grid' , gridTemplateColumns : "1fr 1fr"}}>
        <img src={propertyData.bookeddata.image}/>
        <div>
        <p>Host name: {propertyData.bookeddata.firstname +" "+ propertyData.bookeddata.lastname}</p>
        <p>E-mail: {propertyData.bookeddata.email}</p>
        <p>Mobile No: {propertyData.bookeddata.mobileno}</p>
        </div>
        </div>
      </div> 
      : 
      <div class="property-info-user">
      <h1>User-info</h1>
      <div style={{display : 'grid' , gridTemplateColumns : "1fr 1fr"}}>
        <img src={propertyData.Userdata.image}/>
        <div>
        <p>Host name: {propertyData.Userdata.firstname +" "+ propertyData.Userdata.lastname}</p>
        <p>E-mail: {propertyData.Userdata.email}</p>
        <p>Mobile No: {propertyData.Userdata.mobileno}</p>
        </div>
        </div>
      </div>}
    </div>
    <div class="book-now" style={{marginBottom : "30px"}}>
      <h2>Reviews</h2>
      <div style={{display : 'grid' , gridTemplateColumns : "1fr 1fr"}}>
      {reviews.map((review) => {
        return(
          <>
          <Review name={review.name} note={review.note} date={review.createdAt} image={review.image}/>
          </>
        )
      })}
      </div>
    </div>
    {(compair != toCompair) ? <>
  { !(propertyData.Booking) ? <div class="book-now">
      <h2>Book Now</h2>
      <form class="booking-form" onSubmit={calculateTotalDays}>
        <label for="check-in">Start date:</label>
        <input type="date" id="check-in" name="check-in" required min={`${year}-${month}-${day}`} onChange={(e) => setStartDate(e.target.value)}/><br/>
        <label for="check-out">End date:</label>
        <input type="date" id="check-out" name="check-out" required min={`${year}-${month}-${day}`} onChange={(e) => setEndDate(e.target.value) }/><br/>
         {(checklist != "available") ? <button class="book-button" onClick={addToCompaire}><i class="fas fa-regular fa-heart"></i> add To Compaire</button> : <button class="book-button" onClick={() => {navigate("/wishlist")}}> <h5><i class="fas fa-regular fa-heart"></i> Already added to wishlist</h5> </button>}
         <button type='submit' class="book-button"><i class="fas fa-calendar-plus"></i> proced for Rent</button>
      </form>
    </div> : 
      <div class="add-review">
      {(propertyData.Booking.userId == localStorage.getItem("userId")) ? <><h2>Add a Review</h2>
      <div className='form'>
        <input type="text" placeholder="Your Name" required onChange={(e) => {setname(e.target.value)}}/>
        <textarea placeholder="Your Feedback" required onChange={(e) => {setnote(e.target.value)}}></textarea>
        <button onClick={addReview}>Submit</button>
      </div> </> : <Afterbooked/>}
    </div>
    } </> : <button class="book-button">Update data</button>}
  </div></div>)}</>)
};


const Review = ( {name , note , date , image} ) => {
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
  const isoDate = date;
  const formattedDate = formatDate(isoDate);
  return(
    <>
    <div class="reviews">
      <div class="review-card">
        <div class="review-header">
          <img src={image} alt="User Avatar"/>
          <h2 style={{marginTop : "10px"}}>{name}</h2>
        </div>
        <p class="review-content">{note}.</p>
        <p class="review-date">{formattedDate}</p>
      </div>
    </div>
    </>
  )
}

