import React from 'react'
import { useNavigate } from 'react-router-dom'
const NavElem = ({path,svg}) => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(path)} className='flex justify-center items-center'>
      {svg}
    </div>
  )
}

export default NavElem
