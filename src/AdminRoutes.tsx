import { Routes, Route } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import NewServiceProvider from './pages/admin/NewServiceProvider/NewServiceProvider'
import Test from './pages/admin/NewServiceProvider/Table'
import ServiceAudit from './pages/admin/ServiceAudit/ServiceAudit'
import VerifiedServiceProvider from './pages/admin/VerifiedServiceProvider/VerifiedServiceProvider'
import React from 'react'


function AdminRoutes() {

  return (
    <MyLayout>
      <Routes>
        {/* <Route path='new_service_provider' element={<Test />} /> */}
        <Route path='new_service_provider' element={<NewServiceProvider />} />
        <Route path='service_audit' element={<ServiceAudit />} />
        <Route path='verified_service_provider' element={<VerifiedServiceProvider />} />
      </Routes>
    </MyLayout>
  )
}

export default AdminRoutes