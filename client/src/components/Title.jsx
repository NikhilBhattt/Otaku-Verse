import React from 'react'
import Searchbox from './Searchbox'
import Logo from './Logo'

const Title = ({Search,setSearch}) => {
    return (
        <div className='flex items-center gap-[6vw]'>
            <Logo />
            <Searchbox Search={Search} setSearch={setSearch} />
        </div>
    )
}

export default Title
