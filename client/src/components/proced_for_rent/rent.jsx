import { Header } from "../header/header"
import React, { useState } from 'react';

export const Rent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const calculateTotalDays = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Calculate the difference in milliseconds
        const difference = end - start;
    
        // Convert milliseconds to days
        const daysDifference = difference / (1000 * 3600 * 24);
    
        setTotalDays(Math.floor(daysDifference));
      };

    return(
        <>
        <Header/>
        <h1 style={{paddingTop : "6rem"}}>Proceed to Rent</h1>
        <form style={{display : "flex" , justifyContent : "center"}}>
        <div>Start Date<input type="date" min={`${year}-${month}-${day}`} onChange={(e) => setStartDate(e.target.value) }/></div>
        <div>End Date<input type="date"  min={`${year}-${month}-${day}`} onChange={(e) => setEndDate(e.target.value) }/></div>
        </form>
        <button onClick={calculateTotalDays}>Calculate Total Days</button>
        {totalDays > 0 && (
        <p>Total number of days: {totalDays}</p>
        )}
        </>
    )
}