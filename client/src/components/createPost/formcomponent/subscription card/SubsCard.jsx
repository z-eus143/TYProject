import React from 'react';
import './SubsCard.css';

const SubsCard = ({ Title, Prices, Description, News }) => {

  const subscribedata = (e) => {
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();
      if (e.target.value == 3000) {
        currentMonth += 3;
        if (currentMonth > 11) {
          currentMonth -= 12;
          currentYear++;
        }
        const futureDate = new Date(currentYear, currentMonth, now.getDate());
        const formattedDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
          console.log(formattedDate)


      }if (e.target.value == 5000){
        currentMonth += 6;
        if (currentMonth > 11) {
          currentMonth -= 12;
          currentYear++;
        }
        const futureDate = new Date(currentYear, currentMonth, now.getDate());
        const formattedDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
          console.log(formattedDate)


      }if (e.target.value == 9000){
        currentMonth += 12;
        if (currentMonth > 11) {
          currentMonth -= 12;
          currentYear++;
        }
        const futureDate = new Date(currentYear, currentMonth, now.getDate());
        const formattedDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
          console.log(formattedDate)
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
      
        <button className='Sub-btn' value={Prices} onClick={subscribedata}>Subscribe</button>
      

    </div>
  );
};

export default SubsCard;
