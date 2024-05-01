import './App.css'
import {Route , Routes , BrowserRouter} from 'react-router-dom'
import { Home } from './components/home/home'
import { Wishlist } from './components/Wishlist/wishlist'
import {Signup} from './components/Signupdata/signupdata'
import { CreatePost } from './components/createPost/createPost'
import { Provider } from 'react-redux'
import { store } from './store'
import { Account } from './components/Account/Account'
import {Footer} from './components/Footer/Footer'
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'
import { Displayproperty } from './components/dispalypropertydetails/dispay'
import { Rent } from './components/proced_for_rent/rent'
import { UpdatePropertyDetails } from './components/update/update'

function App() {
  // const data = import.meta.env.REACT_APP_BASE_URL
  const [progress,setProgress] = useState(100)
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/wishlist' element={<Wishlist />}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/createPost' element={<CreatePost/>}/>
          <Route path='/Account' element={<Account/>}/>
          <Route path='/details' element={<Displayproperty/>}/>
          <Route path='/rent' element={<Rent/>}/>
          <Route path='/update' element={<UpdatePropertyDetails/>}/>
        </Routes>
      </BrowserRouter>
      </Provider>
      <Footer/>
    </>
  )
}

export default App
