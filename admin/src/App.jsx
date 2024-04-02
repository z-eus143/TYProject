import { useState } from 'react'
import './App.css'
import { Home } from './home/home'
import { Nav } from './nav/nav'
import {Route , Routes , BrowserRouter} from 'react-router-dom'
import { User } from './User/user'
import { Property } from './properties/property'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/property' element={<Property/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App

const Footer = () => {
  return(
    <footer>
    <p>&copy; 2024 Real Estate Admin</p>
  </footer>
  )
}