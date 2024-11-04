import React from 'react'
import { HomeIcon } from '@heroicons/react/24/outline'
import NavElem from './NavElem'
import navBg from '../assets/svgs/nav.svg'  // Import the SVG

const Nav = () => {
  return (
    <nav 
      className='absolute top-[39.7vh] left-[2.2vw] -translate-y-1/2 inset-0 flex justify-evenly w-[4vw] h-[64vh] max-h-[700px]  items-center flex-col'
      style={{ 
        backgroundImage: `url(${navBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}
    >
        <NavElem path="/" svg={<HomeIcon className='w-5 h-5 text-purple-500'/>} />
        <NavElem path="/" svg={<HomeIcon className='w-5 h-5 text-purple-500'/>} />
        <NavElem path="/" svg={<HomeIcon className='w-5 h-5 text-purple-500'/>} />
        <NavElem path="/" svg={<HomeIcon className='w-5 h-5 text-purple-500'/>} />
        <NavElem path="/" svg={<HomeIcon className='w-5 h-5 text-purple-500'/>} />
    </nav>
  )
}

export default Nav
