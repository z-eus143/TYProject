import React from 'react';
import './SubsCard.css';
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const baseUrl = import.meta.env.VITE_PROD_BASE_URL
const razorpayApiKey = import.meta.env.VITE_RAZORPAY_API_KEY

const SubsCard = ({ Title, Prices, Description, News }) => {
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    const response = await fetch(`${baseUrl}/razorpay/create-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: e.target.value*100, // Amount in paise (100 paise = 1 INR)
            currency: 'INR',
        }),
    });

    const responseData = await response.json();
    const { order_id } = responseData;

    const options = {
        key: razorpayApiKey, // Replace with your Razorpay Key ID
        amount: e.target.value*100, // Amount in paise (100 paise = 1 INR)
        currency: 'INR',
        name: 'Tanmay Maji',
        description: 'Test Payment',
        order_id: order_id,
        handler: function(response) {
            subscribedata(e.target.value,response)
        },
        prefill: {
            name: 'Tanmay Maji',
            email: 'tmaji435@gmail.com',
            contact: '7219293995'
        },
        theme: {
            color: '#F37254'
        }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};


  const subscribedata = async (e,response) => {
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();
      if (e == 3000) {
        currentMonth += 3;
        if (currentMonth > 11) {
          currentMonth -= 12;
          currentYear++;
        }
        const futureDate = new Date(currentYear, currentMonth, now.getDate());
        const formattedDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
          await axios.post(`${baseUrl}/property/subscribe`, {"id" : localStorage.getItem("propertyId"), "endDate" : formattedDate ,"orderdata" : response , "amount" : "3000"})
          .then((res) => {navigate("/") ; localStorage.removeItem('propertyId') ; localStorage.removeItem('locationid') ; localStorage.removeItem('imageid')})
      }if (e == 5000){
        currentMonth += 6;
        if (currentMonth > 11) {
          currentMonth -= 12;
          currentYear++;
        }
        const futureDate = new Date(currentYear, currentMonth, now.getDate());
        const formattedDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
          await axios.post(`${baseUrl}/property/subscribe`, {"id" : localStorage.getItem("propertyId"), "endDate" : formattedDate ,"orderdata" : response , "amount" : "5000"})
          .then((res) => {navigate("/") ; localStorage.removeItem('propertyId') ; localStorage.removeItem('locationid') ; localStorage.removeItem('imageid')})
      }if (e == 9000){
        currentMonth += 12;
        if (currentMonth > 11) {
          currentMonth -= 12;
          currentYear++;
        }
        const futureDate = new Date(currentYear, currentMonth, now.getDate());
        const formattedDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
          await axios.post(`${baseUrl}/property/subscribe`, {"id" : localStorage.getItem("propertyId"), "endDate" : formattedDate ,"orderdata" : response , "amount" : "9000"})
          .then((res) => {navigate("/") ; localStorage.removeItem('propertyId') ; localStorage.removeItem('locationid') ; localStorage.removeItem('imageid')})
        }
  }


  return (
    <div className='Subs-card'>

      {/* Type title */}
      <div className='Sub-Title'>
        {Title && <h1>{Title}</h1>}
      </div>

      {/* Price */}
      <div className='Sub-price'>
        {Prices && <h1>{Prices}</h1>}
      </div>

      {/* description
      <div className='description'>
        {Description && <p>{Description}</p>}
      </div> */}

      {/* company name
      <div className='Sub-news'>
        {News && <p>{News}</p>}
      </div> */}

      {/* button */}
      
        <button className='Sub-btn' value={Prices} onClick={handlePayment}>Subscribe</button>
    </div>
  );
};

export default SubsCard;
