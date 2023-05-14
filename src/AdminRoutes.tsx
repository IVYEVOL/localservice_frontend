import { Routes, Route, Link } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import NewServiceProvider from './pages/admin/NewServiceProvider/NewServiceProvider'
import ServiceAudit from './pages/admin/ServiceAudit/ServiceAudit'
import VerifiedServiceProvider from './pages/admin/VerifiedServiceProvider/VerifiedServiceProvider'
import ServiceReviewsByID from './pages/admin/ServiceReviewsByID'
import ServiceDetailByID from './pages/admin/ServiceDetailByID' 
import { Navigate } from 'react-router-dom'
import { getUser } from './utils/tools'

function AdminRoutes() {

  const loggedIn = getUser();
  console.log(loggedIn)

  if (!loggedIn) {
    return <Navigate to="/customer/login" />;
  }
  

  return (
    <>
      <MyLayout>
        <Routes>
          <Route path='new_service_provider' element={<NewServiceProvider />} />
          <Route path='service_audit' element={<ServiceAudit />} />
          {/* <Route path='verified_service_provider' element={<VerifiedServiceProvider />} /> */}
          <Route path='review_management' element={<VerifiedServiceProvider />} />
          <Route path='service_reviews/:id' element={<ServiceReviewsByID />} />
          <Route path='service_detail/:id' element={<ServiceDetailByID />} />
        </Routes>
      </MyLayout>
    </>

  )
}

export default AdminRoutes
