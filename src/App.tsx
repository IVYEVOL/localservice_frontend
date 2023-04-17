import { Routes, Route } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import Dashboard from './pages/dashboard'
import Users from './pages/customer/profile'

function App() {

  return (
    <MyLayout>
      <Routes>
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='users' element={<Users />} />
      </Routes>
    </MyLayout>
  )
}

export default App
