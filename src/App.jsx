import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoutes'
import PageRoutes from './routes/PageRoutes'
import Login from './features/login/page/Login'
import Register from './features/register/page/Register'
import './App.css'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      {/* <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={<PageRoutes />} />
        <Route
          path="/consumerbranch/:consumerId"
          element={<ConsumerBranch />}
        />
      </Route> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
