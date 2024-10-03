import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoutes'
import PageRoutes from './routes/PageRoutes'
import Login from './features/login/page/Login'
import Register from './features/register/page/Register'
import './App.css'
import { APP_URL } from './constants/APP_URL'
import ConsumerBranch from './features/consumerBranch/pages/ConsumerBranch'
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={APP_URL.REGISTER} element={<Register />} />
        <Route index path={APP_URL.LOGIN} element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route path={APP_URL.DASHBOARD} element={<PageRoutes />} />
        </Route>
       
    </Routes>
  </BrowserRouter>
  )
}

export default App
