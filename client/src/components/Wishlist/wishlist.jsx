import { useEffect, useState } from "react"
import { Header } from "../header/header"
import axios from 'axios'
import '../Wishlist/style.css'
import LoadingBar from 'react-top-loading-bar'
import { WishlistCards } from "../wishlistcard/wishlistcards"
const baseUrl = import.meta.env.VITE_PROD_BASE_URL

export const Wishlist = () => {
    const [postdata, setpostdata] = useState([])
    useEffect(() => {
        axios.post(`${baseUrl}/Wishlist/`,{"userId" : localStorage.getItem("userId")})
        .then((res) => {
            const mappedData = res.data.map(property => ({
                Type: property.Type,
                NoBedRoom: property.NoBedRoom,
                Amenities: property.Amenities,
                Description : property.Description,
                id : property._id,
                Category : property.Category,
                Amount: property.RentAmount

            }));
            setpostdata(mappedData)
        })
      },[])
    const [progress,setProgress] = useState(100)
    return (
    <>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
    <Header />  
    <div style={{paddingTop : "5rem"}}>
    <div style={{display : "grid" , gridTemplateColumns : "1fr 1fr 1fr 1fr" , columnGap : "10px" , marginLeft : "5rem" , marginTop : "2rem" , rowGap : "1rem"}}>
                {postdata.map((item, index) => {
                return(<div  style={{display : 'grid' , gridTemplateColumns : '1fr 1fr' , width : "100%" , columnGap : '20px'}} key={index}><WishlistCards id={item.id} Title={item.Type} description={item.Amenities} noofbedrooms={item.NoBedRoom} Category={item.Category} amount={item.Amount}/></div>)
             })}
             </div>
             </div>
    </>
)}