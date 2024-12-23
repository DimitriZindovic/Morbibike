import App from '../App'
import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Admin
import GeneralLayout from '../layout/GeneralLayout'
import Home from '../pages/Home'

const AppRoutes: FC = () => (
  <Routes>
    <Route element={<App />}>
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
)

export default AppRoutes
