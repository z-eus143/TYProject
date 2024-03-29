import { Header } from "../header/header"
import React, { useState , useEffect} from 'react';
import Razorpay from 'razorpay';

export const Rent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalDays, setTotalMonths] = useState(0);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const calculateTotalDays = () => {
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            const startYear = start.getFullYear();
            const startMonth = start.getMonth();
        
            const endYear = end.getFullYear();
            const endMonth = end.getMonth();
        
            const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
        
            setTotalMonths(totalMonths * 2000);
      };

    return(
        <>
        <Header/>
        <h1 style={{paddingTop : "6rem"}}>Proceed to Rent</h1>
        <div style={{display : "flex" , justifyContent : "center"}}>
        <div>Start Date<input type="date" min={`${year}-${month}-${day}`} onChange={(e) => setStartDate(e.target.value) }/></div>
        <div>End Date<input type="date"  min={`${year}-${month}-${day}`} onChange={(e) => setEndDate(e.target.value) }/></div>
        </div>
        <button onClick={calculateTotalDays}>Calculate Total Amount</button>
        {totalDays > 0 && (
        <p>Total amount to pay: {totalDays}</p>
        )}
        <div style={{width : "20rem", marginLeft : "38rem"}}>
          <h3>Select Rent Payment Method: </h3>
          <ul style={{listStyle : "none" , marginLeft : "-2.5rem" }}>
          <li><label className="for_lab"><input type="radio" value="Pay online" name="options" onChange={(e) => {console.log(e.target.value) ; setVisible(false) ; setVisible1(true)}}/>Pay online</label></li>
          <li><label className="for_lab"><input type="radio" value="Or pay directly to the house Owner" name="options" onChange={(e) => {console.log(e.target.value); setVisible(true) ; setVisible1(false)}}/>Or pay directly to the house Owner</label></li>
          {
            (visible) && <Token/>
          }
          {
            (visible1) && <Pay/>
          }
          </ul>
        </div>

        </>
    )
}

const Token = () => {
    return(
        <>
        <h3>Token Amount 500 for Choosing this room</h3>
        <button>Proced to pay the Token Amount</button>
        </>
    )
}

const Pay = () => {
    return(
        <>
        <button>Proced to pay the Initial Amount</button>
        </>
    )
}