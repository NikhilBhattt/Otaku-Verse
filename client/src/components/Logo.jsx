import React from 'react'
import logo from '../assets/svgs/logo.svg'
const Logo = () => {
  return (
    <div className='flex items-center gap-[3vw] '>
      <img src={logo} alt="logo" className='w-10'/>
      <h1 className='text-4xl font-bold font-shojumaru'>OtakuVerse</h1>
    </div>
  )
}

export default Logo
