import React from 'react'
import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/verify/verify'
import Footer from './components/Footer/Footer'
import LoginPobup from './components/Loginpobup/LoginPobup'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  const [showLogin, setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPobup setShowLogin={setShowLogin} />:<></>}
    <div className='App'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Cart' element={<Cart />}/>
        <Route path='/Order' element={<PlaceOrder />}/>
        <Route path='/verify' element={<Verify />}/>
        <Route path='/MyOrders' element={<MyOrders />}/>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App