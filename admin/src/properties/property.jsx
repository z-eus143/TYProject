import '../properties/style.css'
import {useNavigate} from 'react-router-dom'
import { useState , useEffect } from 'react';
import axios from 'axios'
export const Property = () => {
    const [types , settype] = useState([]);
    const navigate = useNavigate;
    useEffect(() => {
        axios.get(`http://localhost:4000/property/properties`)
        .then((data) => {
            settype(data.data.properties)   
            const types = types.map(item => item.Type);
            settype(types)
        })
      }, []);
    return(
<div class="container-property">
    <h2>Admin Dashboard Properties List</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            {/* // types.map((type) => {
            //     return( <>
            //          <Datahosted name={type.Type} id={type._id} amount={type.RentAmount}/>
            //      </>)
            //  }) */}
             {types.map((type, index) => {
                return(<tr key={index} id={type.id} onClick={(e) => navigate('/details' , {state : {id : e.target.id}})}><td>{index + 1}</td><Datahosted name={type.Type} id={type._id} amount={type.RentAmount}/></tr>)
             })}
        </tbody>
    </table>
</div>
    )
}

const Datahosted = ({name , id , amount}) => {
    const navigate = useNavigate();
    const [image,setImages] = useState([])
    const [location,setlocation] = useState("")
    axios.post(`http://localhost:4000/property/imagesfromdb`, {"id" : id})
    .then((res) => {
      const dbimage = res.data.images[0].images[0]
      setImages(dbimage)
    axios.post(`http://localhost:4000/property/locationdb`, {"id" : id})
    .then((res) => {
      setlocation(res.data.propertyid.locality+", "+res.data.propertyid.city)
    })
    })
    return(<>
        <td id={id}>{name}</td>
        <td id={id}>{location}</td>
        <td id={id}>₹{amount}/month</td>
        <td id={id}>
            <div class="image-container" id={id}>
                <img class="property-image" src={image} alt="Property Image" id={id}/>
            </div>
        </td>
        </>
    )
}