import React, { useState } from 'react'
import search from '../assets/svgs/search.svg'
import { useNavigate } from 'react-router-dom'

const Searchbox = ({Search, setSearch}) => {
    const navigate = useNavigate();

    const getAnime = async () => {
        navigate('/search');
    }
  return (
    <form className='flex items-center px-2 w-[30vw] h-[10vh]' 
    onSubmit={(e) => {
        e.preventDefault()
        getAnime();
    }}
    style={{
        backgroundColor: "rgba(250,166,156,0.5)",
        maskImage: `url("${search}")`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat', 
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        WebkitMaskImage: `url("${search}")`,
    }}
    >
        <input 
            type="text" 
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded outline-none "
            style={{
                backgroundColor:"rgba(255,255,255,1)",
                maskImage: `url("${search}")`,
                maskRepeat: 'no-repeat',
                maskSize: 'contain',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat', 
                WebkitMaskSize: 'contain',
                WebkitMaskPosition: 'center',
                WebkitMaskImage: `url("${search}")`,
            }}
        />
    </form>
  )
}

export default Searchbox
