import React from 'react'
import trendingSvg from '../assets/svgs/trending.svg'

const Glass = () => {
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

    </div>
  )
}

export default Glass
