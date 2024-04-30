import Cards from "../Cards/cards"
import { Header } from "../header/header"
import '../home/style.css'
import search from '../../assets/search.png'
import { useState , useEffect } from "react"
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"
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
                    id: property._id
                }));
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
                    <div key={index}><Cards id={item.id} Title={item.Type} noofbedrooms={item.NoBedRoom} NoBathRoom={item.NoBathRoom} Amount={item.Amount} /></div>
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
