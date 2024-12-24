import { Routes, Route, Navigate } from 'react-router-dom'
import GeneralLayout from '../layout/GeneralLayout'
import Home from '../pages/Home'
import BikeDetails from '../pages/BikeDetails'
import { BikeProvider } from '../context/BikeContext'

const AppRoutes = () => (
  <BikeProvider>
    <Routes>
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bike/:id" element={<BikeDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BikeProvider>
)

export default AppRoutes
