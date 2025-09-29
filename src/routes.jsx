import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Principal from './pages/Principal'

export default function AppRoutes(){
  return (
    <div>
      <nav style={{padding:10}}>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link> | <Link to="/principal">Principal</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </div>
  )
}
