import React from 'react'


const Foot = ({url}) => {
  return (
    <div 
      className="w-[8.5vw] aspect-square bg-no-repeat bg-cover rounded-tr-[14px] rounded-bl-[10px]"
      style={{ backgroundImage: `url(${url})` }}
    >
    </div>
  )
}

export default Foot
