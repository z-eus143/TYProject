import { Header } from '../header/header'
import axios from 'axios'
import '../proced_for_rent/style.css'
import { useEffect } from 'react'
import {useLocation , useNavigate} from 'react-router-dom'
const baseUrl = import.meta.env.VITE_PROD_BASE_URL
export const Rent = () => {
  const location = useLocation();
  const receivedData = location.state;
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const subscribedata = async (response) => {
          await axios.post(`${baseUrl}/Account/Payment`, {"pro_id" : receivedData.id,"use_id" : localStorage.getItem("userId"), "startDate" : receivedData.startDate , "endDate" : receivedData.endDate ,"orderdata" : response , "amount" : receivedData.amount*receivedData.totalMonths , "Vaccancy" : receivedData.Vaccancy})
          .then(async (res) => {
            const emailData = {
              to: res.data.email,
              subject: 'Home Rented E-mail',
              text: `Your home is rented for ${receivedData.totalMonths} Months by ${res.data.name}`,
            };
            try {
              await axios.post(`${baseUrl}/send-email`, emailData);
              // alert('Email sent successfully');
            } catch (error) {
              console.error(error);
              // alert('Error sending email');
            }
            navigate("/")
          })
  }

  const handlePayment = async (e) => {
    const response = await fetch(`${baseUrl}/razorpay/create-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: receivedData.amount * receivedData.totalMonths*100, // Amount in paise (100 paise = 1 INR)
            currency: 'INR',
        }),
    });

    const responseData = await response.json();
    const { order_id } = responseData;

    const options = {
        key: 'rzp_test_8VYQBFKrK9Y2qI', // Replace with your Razorpay Key ID
        amount: receivedData.amount * receivedData.totalMonths*100, // Amount in paise (100 paise = 1 INR)
        currency: 'INR',
        name: 'Tanmay Maji',
        description: 'Test Payment',
        order_id: order_id,
        handler: function(response) {
            subscribedata(response)
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


  return(<>
    <Header />
    <div style={{paddingTop : "4rem"}}></div>
    <div class="container-rent">
    <div class="confirmation">
      <h2>Confirm and Pay</h2>
      <p>Please review your booking details and proceed with payment:</p>
      <div class="booking-details">
        <h3>Booking Details</h3>
        <p><strong>Location:</strong> {receivedData.city + "," + receivedData.locality}</p>
        <p><strong>Check-in:</strong> {receivedData.startDate}</p>
        <p><strong>Check-out:</strong> {receivedData.endDate}</p>
        <p><strong>Total Price:</strong> {receivedData.totalMonths +" months * " + receivedData.amount + "₹ = " + receivedData.amount * receivedData.totalMonths +"₹"} </p>
      </div>
      <div class="booking-details">
        <h3>Ground rules</h3>
        <p>
            We ask every guest to remember a few simple things about what makes a great guest.
            <p>{">"} Follow the house rules</p>
            <p>{">"} Treat your Host’s home like your own</p>
        </p>
      </div>
      <div class="payment-form">
      </div>
      <button class="btn-pay" onClick={handlePayment}>Pay Now</button>
    </div>
  </div>
  </>
  )
}