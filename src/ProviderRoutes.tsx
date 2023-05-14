import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import CustomerMenu from './pages/provider/CustomerMenu'
import AddService from './pages/provider/AddService'
import UpdateService from './pages/provider/UpdateService'
import ServiceRequest from './pages/provider/ServiceRequest'
import ServiceList from './pages/provider/ServiceList'
import Profile from './pages/provider/Profile'
import ServiceDetail from './pages/provider/ServiceDetail'
import service from './provider_data/services.json'
import ViewService from './pages/provider/ViewService'
import MessageList from './pages/provider/MessageList'
import ViewOrder from './pages/provider/ViewOrder'

function ProviderRoutes() {

  return (
    <>
       <CustomerMenu />
      <Container className = "mb-4"> 
        <Routes>
          <Route index element={<ServiceList />}></Route>
          {/* <Route path='ServiceList' element={<ServiceList />} /> */}
          <Route path='AddService' element={<AddService />} />
          <Route path='MessageList' element={<MessageList />} />
          <Route path='UpdateService/:id' element={<UpdateService />} />
          <Route path='ServiceRequest' element={<ServiceRequest />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='ServiceList/ServiceDetail' element={<ServiceDetail />} />
          <Route path='viewservice/:id' element={<ViewService />} />
          {/* <Route path='vieworder/:id' element={<ViewOrder />} /> */}
      </Routes>
      
      </Container>
    </>
    
      

    
  )

  //   <MyLayoutProvider>
  //     <Routes>
  //     <Route path='Addservice' element={<AddService />} />
  //     <Route path='ServiceRequest' element={<ServiceRequest />} />
  //     <Route path='ServiceList' element={<ServiceList />} />
  //     {/* <Route path='dashboard' element={<Dashboard/>} /> */}
  //     </Routes>
  //   </MyLayoutProvider>
  // )
}

export default ProviderRoutes