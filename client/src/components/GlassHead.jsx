import React from 'react'
import trendingHeadSvg from '../assets/svgs/trendingHead.svg'

const GlassHead = () => {
  return (
    <div 
      className="w-[15vw] absolute top-0 left-[0.5vw] flex items-center px-4 h-[6vh] bg-white"
      style={{
        maskImage: `url(${trendingHeadSvg})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${trendingHeadSvg})`,
      }}
    >
        <h2><span className='text-purple-500'>#</span> Trending</h2>
      
    </div>
  )
}

export default GlassHead
