import React, { useState, useEffect } from 'react'
import Anime from './components/Anime'
import axios from 'axios';
const Searchpage = ({Search}) => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/getAnime',{search: Search})
      .then((res) => {
        setSearchResults(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }, []);
    
  return (
    <div className='h-screen'>
      <h1 className='text-2xl font-bold'>Search Results</h1>
      <div className='flex flex-wrap gap-4 overflow-y-auto h-[calc(100vh-8rem)] p-4'>
        {
          searchResults.map((anime) => (
            <Anime key={anime.id} {...anime} />
          ))
        }
      </div>
    </div>
  )
}

export default Searchpage
