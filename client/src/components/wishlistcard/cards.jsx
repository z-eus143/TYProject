import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Cards/Cards.css';
import { useNavigate } from 'react-router-dom';
export const WishlistCards = ({Title, description,noofbedrooms,id}) => {
  const navigate = useNavigate();
  const [image,setImages] = useState([])
  useEffect(() => {
    axios.post("http://localhost:4000/property/imagesfromdb", {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    })
  },[])

  const deletedata = async () => {
      const result = await axios.post("http://localhost:4000/wishlist/delete" , {"userId" : localStorage.getItem("userId") , "itemId" : id})
  }
  return (
    <div className='Card-container'>
      {/* image */}
      {image && (<img src={image} alt="image" className='Card-Img' id={id}/>)}

      {/* title */}
      {/* <label style={{marginRight : "6rem", marginBottom : "0px"}}>House Name</label> */}
      {Title && (<h1 className='Card-title' id={id}>{Title}</h1>)}

      {/* desciption */}
      {noofbedrooms &&(<p className='Card-description' id={id}>{noofbedrooms}</p>)}

      {/* desciption */}
      {description &&(<p className='Card-description' id={id}>{description}</p>)}

      {/* link */}
      {/* {buttontext &&(<a href={link} className='card-btn'>{buttontext}</a>)}  */}
      <button id={id} onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}>View Details</button>
      <button onClick={deletedata}>Delete</button>
    </div>
  )
}

