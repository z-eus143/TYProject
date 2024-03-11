import { useState } from 'react'
import '../Signupdata/style.css'
import logo from '../../assets/profile.jpg'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

export const Signup = () => {
    const navigate = useNavigate();
    const [base64Image,setbase64Image] = useState("");
    const [upload,setUpload] = useState("Upload Your Image");
    const [fname,setfname] = useState("")
    const [lname,setlname] = useState("")
    const [email,setemail] = useState("")
    const [mobileno,setmobileno] = useState("")
    const handleImagechange = (event) => {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setbase64Image(reader.result.toString());
            };
            reader.readAsDataURL(file);
            setUpload("")
        }
    };

    const handleSubmit = async (e) => {
        const user = {
            "firstname" : fname,
            "lastname" : lname,
            "email" : Cookies.get('email').toString(),
            "image" : base64Image,
            "mobileno" : mobileno
        }
        e.preventDefault()
        await axios.post("http://localhost:4000/create/createDate",{user})
        .then(res => {
            Cookies.remove('email')
            localStorage.setItem("userId",res.data.user._id)
            localStorage.setItem("userName",res.data.user.firstname)
            localStorage.setItem("userImage",res.data.user.image)
            navigate("/");
        })
    }

    return(
    <div className='Datainput_form'>
        <form onSubmit={handleSubmit}>
    <div className='Datainput'>
        <h1>Enter Your Details</h1>
        <div className='Datainput_field'>
        <div>
            {base64Image ? <img src={base64Image} alt="Userimage" className='Datainput_img'/> : <img src={logo} alt="Userimage" className='Datainput_img'/>}
            <h1>{upload}</h1>
            <input type='file' className='custom-file-input'onChange={event => handleImagechange(event)} required/>
        </div>
        <div className='Datainput_txt'>
            <div className='txt_input'><input type="text" placeholder="First Name" className='txt_input_field' required onChange={(e)=>{setfname(e.target.value)}}/></div>
            <div className='txt_input'><input type="text" placeholder="Last Name" className='txt_input_field'required onChange={(e)=>{setlname(e.target.value)}}/></div>
            <div className='txt_input'><input type="email" placeholder="E-mail" className='txt_input_field' required onChange={(e)=>{setemail(e.target.value)}} value={Cookies.get('email')}/></div>
            <div className='txt_input'><input type="text" placeholder="Mobile Number" className='txt_input_field' required maxLength="10" onChange={(e)=>{setmobileno(e.target.value)}}/></div>
        </div>  
        </div>
        <button className='btn'>Submit</button>  
    </div>
    </form>
    </div>
)}
