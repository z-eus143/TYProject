import { useEffect , useState } from 'react'
import '../User/user.css'
import axios from 'axios'
export const User = () => {
    const [postdata, setpostdata] = useState([])
    useEffect(() => {
        axios.post("http://localhost:4000/Account/Userdata")
        .then((res) => {
            const data = res.data.map(user => ({
                name : user.firstname,
                id : user._id,
                email : user.email,
                contact : user.mobileno
            }))
            setpostdata(data)
        })
    },[])
    return(
        <div class="container">
    <h2>Admin Dashboard Users List</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
            </tr>
        </thead>
        <tbody>
                {postdata.map((item, index) => {
                return(<tr key={index}><td>{index + 1}</td><Userdata id={item.id} firstname={item.name} email={item.email} contact={item.contact}/></tr>)
             })}
        </tbody>
    </table>
</div>

    )
}


const Userdata = ({firstname , id , email , contact}) => {
    return(
        <>
                {/* <td>1</td> */}
                <td>{firstname}</td>
                <td>{email}</td>
                <td>{contact}</td>
            </>
    )
}