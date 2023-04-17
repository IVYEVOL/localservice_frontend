import { Routes, Route } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import Dashboard from './pages/dashboard'
import Users from './pages/customer/profile'
import NewServiceProvider from './pages/admin/NewServiceProvider'
import ServiceAudit from './pages/admin/ServiceAudit'
import VerifiedServiceProvider from './pages/admin/VerifiedServiceProvider'

function App() {

  return (
    <MyLayout>
      <Routes>
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='users' element={<Users />} />
        <Route path='new_service_provider' element={<NewServiceProvider />} />
        <Route path='service_audit' element={<ServiceAudit />} />
        <Route path='verified_service_provider' element={<VerifiedServiceProvider />} />
      </Routes>
    </MyLayout>
  )
}

export default App