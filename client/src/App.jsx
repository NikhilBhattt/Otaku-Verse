import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Searchpage from './Searchpage'
import Body from './components/Body'
import Upload from './Upload'
import { motion } from 'framer-motion'
import Player from './Player'
import './app.css'
import cursor from './assets/cursor.gif'
import { SearchProvider } from './contexts/SearchContext'

function App() {
  const [Coord, setCoord] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoord({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    console.log(Coord);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <SearchProvider>
      <motion.div
        className='w-[20px] aspect-square absolute top-0 left-0 z-50 bg-white rounded-full'
        style={{
          backgroundImage:`url(${cursor})`,
          backgroundRepeat:'no-repeat',
          backgroundSize:'cover'
        }}
        animate={{
          x: Coord.x + 10, // subtract half the width to center the dot
          y: Coord.y + 10  // subtract half the height to center the dot
        }}
        transition={{
          type: "spring",
          stiffness: 200,  
          damping: 30,     
          mass: 1,         
          bounce: 0.25,    
          restSpeed: 0.01,
          restDelta: 0.01
        }}
      >
      </motion.div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body children={<Home />} />} />
          <Route path="/search" element={<Body children={<Searchpage />} />} />
          <Route path="/player" element={<Body children={<Player animeName={'okatu'} />} />} />
          <Route path="/upload" element={<Body children={<Upload/>} />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App