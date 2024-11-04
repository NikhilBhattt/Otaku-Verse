import React from 'react'
import GlassHead from './GlassHead'
import Glass from './Glass'

const VrSlider = () => {
  return (
    <div className='relative z-10 flex flex-col'>
        <GlassHead/>
        <Glass/>
    </div>
  )
}

export default VrSlider
