import  { Header } from "../header/header"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../Account/style.css'
import {RiNotification2Fill , RiWallet2Fill , RiEdit2Fill , RiUser3Line} from '@remixicon/react'
import LoadingBar from 'react-top-loading-bar'
import {useNavigate} from 'react-router-dom'


export const Account = () => {
    const [types , settype] = useState([]);
    const [books , setbook] = useState([]);
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
        axios.post("http://localhost:4000/Account/Userhosted",{"id" : localStorage.getItem("userId")})
        .then((data) => {
            settype(data.data.user)
            const types = types.map(item => item.Type);
            settype(types)
            setbook(data.data.user)
            const books = books.map(item => item.Type);
            setbook(books)
        })
      }, []);
    const [progress,setProgress] = useState(100)
    const change = () => {
        setopen(true)
    }
    const [email,setemail] = useState("");
    const [image,setimage] = useState("");
    const [lname,setlname] = useState("");
    const [mobile,setmobile] = useState("");
    const [fname,setfname] = useState("");
    axios.post("http://localhost:4000/Account/User",{"id" : localStorage.getItem("userId")})
    .then((res) => {
        setemail(res.data.user.email);
        setimage(res.data.user.image);
        setfname(res.data.user.firstname);
        setmobile(res.data.user.mobileno);
        setlname(res.data.user.lastname);
    })
    return(<>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Header />
        <div style={{paddingTop : "5.5rem"}}></div>
        <div class="profile-container">
    <div class="profile-picture">
        <img src={image} alt="Profile Picture"/>
    </div>
    <div class="profile-info">
        <h2>{fname +" "+lname}</h2>
        <p><i class="fas fa-envelope"></i>Email: {email}</p>
        <p><i class="fas fa-phone"></i>Phone: +91 {mobile}</p>
        <p><i class="fas fa-map-marker-alt"></i>Location: New York, USA</p>
        <p><i class="fas fa-calendar-alt"></i>Joined: January 1, 2020</p>
    </div>
</div>
<div class="container">
    <h2>Hosted Properties</h2>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody className="scrollable-tbody">
        {
            types.map((type) => {
                return( <>
                     <Datahosted name={type.Type} id={type._id} amount={type.RentAmount}/>
                 </>)
             })
        }   
        </tbody>
    </table>
</div>
<div class="container">
    <h2>Rented Properties</h2>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody className="scrollable-tbody">
        {
            books.map((book) => {
                return( <>
                     <Datarented id={book.propertyId}/>
                 </>)
             })
        }   
        </tbody>
    </table>
</div>
        </>
    )
} 
const Datahosted = ({name , id , amount}) => {
    const navigate = useNavigate();
    const [image,setImages] = useState([])
    const [location,setlocation] = useState("")
    axios.post("http://localhost:4000/property/imagesfromdb", {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    axios.post("http://localhost:4000/property/locationdb", {"id" : id})
    .then((res) => {
      setlocation(res.data.propertyid.locality+", "+res.data.propertyid.city)
    })
    })
    return(
        <tr id={id} onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}>
        <td id={id}>{name}</td>
        <td id={id}>{location}</td>
        <td id={id}>₹{amount}/month</td>
        <td id={id}>
            <div class="image-container" id={id}>
                <img class="property-image" src={image} alt="Property Image" id={id}/>
            </div>
        </td>
    </tr>
    )
}

const Datarented = ({id}) => {
    const navigate = useNavigate();
    const [image,setImages] = useState([])
    const [location,setlocation] = useState("")
    axios.post("http://localhost:4000/property/imagesfromdb", {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    axios.post("http://localhost:4000/property/locationdb", {"id" : id})
    .then((res) => {
      setlocation(res.data.propertyid.locality+", "+res.data.propertyid.city)
    })
    })
    return(
        <tr id={id} onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}>
        <td id={id}>Payal plaza</td>
        <td id={id}>{location}</td>
        <td id={id}>₹1000/month</td>
        <td id={id}>
            <div class="image-container" id={id}>
                <img class="property-image" src={image} alt="Property Image" id={id}/>
            </div>
        </td>
    </tr>
    )
}