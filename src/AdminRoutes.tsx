import { Routes, Route, Link } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import NewServiceProvider from './pages/admin/NewServiceProvider/NewServiceProvider'
import Test from './pages/admin/NewServiceProvider/Table'
import ServiceAudit from './pages/admin/ServiceAudit/ServiceAudit'
import VerifiedServiceProvider from './pages/admin/VerifiedServiceProvider/VerifiedServiceProvider'
import ServiceReviewsByID from './pages/admin/ServiceReviewsByID'
import React from 'react'
import ServiceReviewLayout from './components/ServiceReviewLayout'


function AdminRoutes() {

  return (
    <>
      <MyLayout>
        <Routes>
          {/* <Route path='new_service_provider' element={<Test />} /> */}
          <Route path='new_service_provider' element={<NewServiceProvider />} />
          <Route path='service_audit' element={<ServiceAudit />} />
          <Route path='verified_service_provider' element={<VerifiedServiceProvider />} />
          {/* <Link to="/mtr/12345?type=c">Netflix</Link> */}
          <Route path='service_reviews/:id' element={<ServiceReviewsByID />} />
        </Routes>
      </MyLayout>





    </>

  )
}

export default AdminRoutes

// function ServiceReviewRoutes() {
//   return (
//     <ServiceReviewLayout>
//       <Routes>
//         <Route path='service_reviews/:id' element={<ServiceReviewsByID />} />
//       </Routes>
//     </ServiceReviewLayout>
//   )
// }

// export default ServiceReviewRoutes