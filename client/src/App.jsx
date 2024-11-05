import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Body from './components/Body'
import './app.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body children={<Home/>}/>} />
        <Route path="/search" element={<Body children={<Search/>}/>} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App