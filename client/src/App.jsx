import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Body from './components/Body'
import './app.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body children={<Home/>}/>} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App