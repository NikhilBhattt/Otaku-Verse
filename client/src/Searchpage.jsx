import React, { useState, useEffect, useContext } from 'react';
import Anime from './components/Anime';
import axios from 'axios';
import { SearchContext } from './contexts/SearchContext'; // Import the context

const Searchpage = () => {
  const { Search } = useContext(SearchContext);
  console.log('this is search',Search);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:3000/api/getAnime', {
      Search: Search // Send search as part of the request body
    })
    .then((res) => {
      setSearchResults(res.data);
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }, [Search]); // Add search as a dependency

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
  );
};

export default Searchpage;
