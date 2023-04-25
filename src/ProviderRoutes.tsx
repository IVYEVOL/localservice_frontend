import { Routes, Route } from 'react-router-dom'
import MyLayoutProvider from "./components/MyLayout_provider"
import AddService from './pages/provider/AddService'
import ServiceRequest from './pages/provider/ServiceRequest'
import Dashboard from './pages/dashboard'
import ServiceList from './pages/provider/ServiceList'

function ProviderRoutes() {

  return (

    <MyLayoutProvider>
      <Routes>
      <Route path='Addservice' element={<AddService />} />
      <Route path='ServiceRequest' element={<ServiceRequest />} />
      <Route path='ServiceList' element={<ServiceList />} />
      {/* <Route path='dashboard' element={<Dashboard/>} /> */}
      </Routes>
    </MyLayoutProvider>
  )
}

export default ProviderRoutes