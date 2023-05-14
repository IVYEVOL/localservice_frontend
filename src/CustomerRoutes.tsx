import { Routes, Route } from 'react-router-dom'
import CustomerMenu from './pages/customer/CustomerMenu'
import './pages/customer/customerccss.css'
import CustomerHome from './pages/customer/CustomerHome'
import Login from './pages/login'
import MapSearching from './pages/customer/MapSearching'
import ViewService from './pages/customer/ViewService'
import PayServiceWrapper from './pages/customer/PayServiceWrapper'
import MesssageList from './pages/customer/MessageList'
import ServiceReviewMessage from './pages/customer/ServiceReviewMessage'
import RequestUpdatingMessage from './pages/customer/RequestUpdatingMessage'
import BookingList from './pages/customer/BookingList'
import Order from './pages/customer/Order'
import Profile from './pages/customer/profile'
import UpdateOrder from './pages/customer/UpdateOrder'
import { AuthData } from './pages/customer/AuthContext'
import { useState } from 'react'


function CustomerRoutes() {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  return (
    <div>
        <CustomerMenu />
        <Routes>
        <Route index element={<CustomerHome />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='mapsearching' element={<MapSearching />}></Route>
          <Route path='viewservice/:id' element={<ViewService />} />
          <Route path='viewservice/:id/payservice' element={<PayServiceWrapper />} /> 
          <Route path='messagelist/*'>
            <Route index element={<MesssageList />} ></Route>
            <Route path='servicereviewmessage/:id/:id2' element={<ServiceReviewMessage />} ></Route>
            <Route path='requestupdatingmessage/:id/:id2' element={<RequestUpdatingMessage />} ></Route>
          </Route>
          <Route path='bookinglist/*'>
            <Route index element={<BookingList />}></Route>
            <Route path='order/:id' element={<Order />}></Route>
          </Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='updateorder' element={<UpdateOrder />}></Route>
        </Routes>    
        
    </div>
    
  )

}
export default CustomerRoutes