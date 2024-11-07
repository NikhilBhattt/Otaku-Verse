import React from 'react'
import Searchbox from './Searchbox'
import Logo from './Logo'

const Title = () => {
    return (
        <div className='flex items-center gap-[6vw]'>
            <Logo />
            <Searchbox/>
        </div>
    )
}

export default Title
