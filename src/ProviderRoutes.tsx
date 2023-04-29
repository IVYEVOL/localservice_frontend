import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ProviderNavbar } from "./components/ProviderNavbar"
import AddService from './pages/provider/AddService'
import ServiceRequest from './pages/provider/ServiceRequest'
import ServiceList from './pages/provider/ServiceList'
import ServiceDetail from './pages/provider/ServiceDetail'

function ProviderRoutes() {

  return (
    <>
      <ProviderNavbar />
      <Container className = "mb-4"> 
        <Routes>
          <Route path='ServiceList' element={<ServiceList />} />
          <Route path='AddService' element={<AddService />} />
          <Route path='ServiceRequest' element={<ServiceRequest />} />
          <Route path='ServiceList/ServiceDetail' element={<ServiceDetail />} />
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