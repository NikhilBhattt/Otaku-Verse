import React, { useState } from 'react'
import axios from 'axios'
import search from '../assets/svgs/search.svg'


const Search = ({Search, setSearch}) => {
    const getAnime = async (Search) => {
        axios.get(`https://api.jikan.moe/v4/anime?q=${Search}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching anime:', error);
        });
    }
  return (
    <form className='flex items-center px-2 w-[30vw] h-[10vh]' 
    onSubmit={(e) => {
        e.preventDefault()
        getAnime(Search);
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

export default Search
