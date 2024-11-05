import React from 'react'
import Search from './Search'
import Logo from './Logo'

const Title = () => {
    return (
        <div className='flex items-center gap-[6vw]'>
            <Logo />
            <Search />
        </div>
    )
}

export default Title
