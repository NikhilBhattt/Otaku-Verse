import React from 'react'
import trendingSvg from '../assets/svgs/trending.svg'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Glass = () => {
  const [Trending, setTrending] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/trending')
    .then(res => setTrending(res.data))
    .catch(err => console.log(err))
  }, [])
  return (
    <div 
      className="h-[62vh] w-56"
      style={{
        maskImage: `url(${trendingSvg})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${trendingSvg})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      {Trending.map((item, index) => (
        <div key={index} className='flex flex-col items-center justify-center'>
          <img src={item.image} alt={item.name} className='w-10 h-10 rounded-full' />
          <p className='text-xs text-white'>{item.name}</p>
        </div>
      ))}

    </div>
  )
}

export default Glass
