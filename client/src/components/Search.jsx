import React, { useState } from 'react'
import axios from 'axios'

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
    <form className='flex items-center gap-2' 
    onSubmit={(e) => {
        e.preventDefault()
        getAnime(Search);
    }}
    style={{
        backgroundColor: "rgba(250,166,156,0.5)",
        maskImage: `url(../assets/svgs/search.svg)`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(../assets/svgs/search.svg)`,
    }}
    >
        <input type="text" value={Search} onChange={(e) => setSearch(e.target.value)} />
    </form>
  )
}

export default Search
