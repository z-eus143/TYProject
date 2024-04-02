import Cards from "../Cards/cards"
import { Header } from "../header/header"
import '../home/style.css'
import search from '../../assets/search.png'
import { useState , useEffect } from "react"
import LoadingBar from 'react-top-loading-bar'
import axios from "axios"

export const Home = () => {
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
    const [progress,setProgress] = useState(100)
    const [state, setstate] = useState("")
    const [city, setcity] = useState("")
    const [num , setnum] = useState("")
    const [postdata, setpostdata] = useState([])
    const data = {
        "state" : state,
        "city" : city,
        "num" : num
    }
    const searchData = () =>{
        console.log(data);
    }

    useEffect(function postdata() {
        axios.get("http://localhost:4000/property/properties")
            .then((res) => {
                const mappedData = res.data.properties.map(property => ({
                    Type: property.Type,
                    NoBedRoom: property.NoBedRoom,
                    Amenities: property.Amenities,
                    NoBathRoom: property.NoBathRoom,
                    Amount: property.RentAmount,
                    id : property._id
                }));
                setpostdata(mappedData)
            })      
        },[])
    return(
        <>
        <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Header />
        <div className="body_sec">
            <div className="search_sec">
                <input type="text" className="search_txt" placeholder="state" onChange={(e) => setstate(e.target.value)}/>
                <input type="text" className="search_txt" placeholder="city" onChange={(e) => setcity(e.target.value)}/>
                <input type="type" className="search_txt" placeholder=" Select type " onChange={(e) => setnum(e.target.value)}/>
                <img src={search} alt="search" className="img_search" onClick={searchData}/>
            </div>
            <div style={{display : "grid" , gridTemplateColumns : "1fr 1fr 1fr 1fr" , marginLeft : "2rem" , marginTop : "1rem" , rowGap : "1rem"}}>
                {postdata.map((item, index) => {
                return(<div key={index}><Cards id={item.id} Title={item.Type} noofbedrooms={item.NoBedRoom} NoBathRoom={item.NoBathRoom} Amount={item.Amount}/></div>)
             })}
             </div>
        </div>
        </>
    )
}
