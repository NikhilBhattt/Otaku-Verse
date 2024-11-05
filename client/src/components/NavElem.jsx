import React from 'react'
import { useNavigate } from 'react-router-dom'
const NavElem = ({path,svg}) => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(path)} className='flex justify-center items-center'>
      <img src={svg} alt="svg" className='w-5 h-5'/>
    </div>
  )
}

export default NavElem
