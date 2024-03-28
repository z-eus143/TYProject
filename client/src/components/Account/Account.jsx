import  { Header } from "../header/header"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../Account/style.css'
import {RiNotification2Fill , RiWallet2Fill , RiEdit2Fill , RiUser3Line} from '@remixicon/react'
import LoadingBar from 'react-top-loading-bar'
import {useNavigate} from 'react-router-dom'


export const Account = () => {
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
    const [progress,setProgress] = useState(100)
    const [open,setopen] = useState(false)
    const change = () => {
        setopen(true)
    }
    const navigate = useNavigate();
    const [email,setemail] = useState("");
    const [image,setimage] = useState("");
    const [lname,setlname] = useState("");
    const [mobile,setmobile] = useState("");
    const [fname,setfname] = useState("");
    const [type , settype] = useState([]);
    axios.post("http://localhost:4000/Account/User",{"id" : localStorage.getItem("userId")})
    .then((res) => {
        setemail(res.data.user.email);
        setimage(res.data.user.image);
        setfname(res.data.user.firstname);
        setmobile(res.data.user.mobileno);
        setlname(res.data.user.lastname);
    })
    axios.post("http://localhost:4000/Account/Userhosted",{"id" : localStorage.getItem("userId")})
    .then((data) => {
        settype(data.data.user)
        // const types = type.map(item => item.Type);
        // settype(types);
    })
    return(<>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Header />
        <div className="acc_sec">
        <h1 className="acc_user_info">Account Info</h1>
        <div className="User_Account">
            <div className="account_user_profile">
                <label className="user_label">User profile </label><RiUser3Line/>
                <div>
                <img src={image} className="user_image"/>
                <h1 className="account_user_profile_name">{fname +" "+lname}</h1>
                </div>
            </div>
            <div className="account_user_contact">
                <label>Email</label>
                <h1 className="email_txt">{email}</h1>
                <label>Mobile Number</label>
                {(!open) ? <h1 className="mobile_txt" onClick={change}>{mobile}<RiEdit2Fill/></h1> : <input type="text" placeholder={mobile}/>} 
                {(open) && <button onClick={() => setopen(false)}>Update</button>}               
            </div>
            <div>
        <label>Rented Property</label>
        <div className="user_rent"></div>
        <label>Hosted Properties</label>
        <div className="user_hosting">
        {
            type.map(item => (
                <div onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}>
                    <label id={item._id}>{item.Type}</label>
                </div>
            ))
        }
        </div>
        </div>
        </div>

        <h1 className="acc_more_opt">More Options</h1>
        <div className="user_below_sec">
        <div className="user_below_sec_payment"><div><RiWallet2Fill/></div>payment/subscription<p className="para">See All your payment details</p></div>
        <div className="user_below_sec_notification"><div><RiNotification2Fill/></div>Notification<p className="para">Show allow or disable messages</p></div>
        </div>


        </div>
        </>
    )
} 