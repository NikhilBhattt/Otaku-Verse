import React from 'react'
import NavElem from './NavElem'
import navBg from '../assets/svgs/nav.svg'  // Import the SVG
import home from '../assets/nav/home.svg'
import info from '../assets/nav/info.svg'
import fz from '../assets/nav/fz.svg'
import querry from '../assets/nav/querry.svg'
import MN from '../assets/nav/MN.svg'

const Nav = () => {
  return (
    <nav 
      className='absolute top-[40vh] left-[2.2vw] -translate-y-1/2 flex justify-evenly w-[4.5vw] h-[64vh] max-h-[700px]  items-start pl-2 flex-col'
      style={{ 
        backgroundImage: `url(${navBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}
    >
        <NavElem path="/" svg={home} />
        <NavElem path="/" svg={info} />
        <NavElem path="/" svg={fz} />
        <NavElem path="/" svg={MN} />
        <NavElem path="/" svg={querry} />
    </nav>
  )
}

export default Nav
