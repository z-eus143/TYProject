import { Header } from "../header/header"
import '../home/style.css'
import search from '../../assets/search.png'
import { useState , useEffect } from "react"
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"
import { useNavigate } from "react-router-dom"
const baseUrl = import.meta.env.VITE_PROD_BASE_URL

export const Home = () => {
    const [progress,setProgress] = useState(100)
    const [state, setstate] = useState("")
    const [city, setcity] = useState("")
    const [num , setnum] = useState("")
    const [postdata, setpostdata] = useState([])
    const [clickCount, setClickCount] = useState(0);
    const [post,setpost] = useState()
    const data = {
        "state" : state,
        "city" : city,
        "num" : num
    }
    
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
        axios.post(`${baseUrl}/property/propertiesfilter`, {"city": city})
            .then((res) => {
                const mappedData = res.data.properties.map(property => ({
                    Type: property.Type,
                    NoBedRoom: property.NoBedRoom,
                    Amenities: property.Amenities,
                    NoBathRoom: property.NoBathRoom,
                    Amount: property.RentAmount,
                    Category: property.Category,
                    id: property._id
                }
            ));
                setpostdata(mappedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [clickCount]);
    
    useEffect(() => {
        if (postdata.length > 0) {
            setpost(
                postdata.map((item, index) => (
                    <div key={index}><Cards id={item.id} Title={item.Type} noofbedrooms={item.NoBedRoom} NoBathRoom={item.NoBathRoom} Amount={item.Amount} Category={item.Category}/></div>
                ))
            );
        }
    }, [postdata]);
    
      
    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1)
      };

    return(
        <>
        <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Header />
        <div className="body_sec">
            <div className="search_sec">
                <input type="text" className="search_txt" placeholder="state" onChange={(e) => setstate(e.target.value)}/>
                <input type="text" className="search_txt" placeholder="city" onChange={(e) => setcity(e.target.value)}/>
                <input type="type" className="search_txt" placeholder=" Select type " onChange={(e) => setnum(e.target.value)}/>
                <img src={search} alt="search" className="img_search" onClick={handleClick}/>
            </div>
            <div className="dis_post_grid">
                {post}
             </div>
        </div>
        </>
    )
}


const Cards = ({Title, noofbedrooms , id , NoBathRoom , Amount , Category}) => {
    const navigate = useNavigate()
    const [image,setImages] = useState([])
    const [location,setlocation] = useState("")
    axios.post(`${baseUrl}/property/imagesfromdb`, {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    axios.post(`${baseUrl}/property/locationdb`, {"id" : id})
    .then((res) => {
      setlocation(res.data.propertyid.locality+", "+res.data.propertyid.city)
    })
    })
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
          <p><i class="fas fa-home icon"></i> Category {Category}</p>
          <p><i class="fas fa-bed"></i> {noofbedrooms} Bedrooms</p>
          <p><i class="fas fa-bath"></i> {NoBathRoom} Bathrooms</p>
          <p><i class="fas fa-rupee-sign"></i> Price: ₹{Amount} per month</p>
          <button className='bok_btn' id={id} onClick={validate}>Book Now</button>
        </div>
      </div>
        </>
      )
}