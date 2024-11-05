import React from 'react'
import Anime from './components/Anime'

const Search = () => {
    
    const searchResults = [
        {
            id: 1,
            title: "Demon Slayer",
            image: "https://example.com/demon-slayer.jpg",
            desc: "Dubbed: 26 eps | Subbed: 26 eps | Rating: 8.9",
            episodes: 26
        },
        {
            id: 2,
            title: "Attack on Titan",
            image: "https://example.com/aot.jpg",
            desc: "Dubbed: 87 eps | Subbed: 87 eps | Rating: 9.1",
            episodes: 87
        },
        
        {
            id: 2,
            title: "Attack on Titan",
            image: "https://example.com/aot.jpg",
            desc: "Dubbed: 87 eps | Subbed: 87 eps | Rating: 9.1",
            episodes: 87
        },
        
        {
            id: 2,
            title: "Attack on Titan",
            image: "https://example.com/aot.jpg",
            desc: "Dubbed: 87 eps | Subbed: 87 eps | Rating: 9.1",
            episodes: 87
        },
        
        {
            id: 2,
            title: "Attack on Titan",
            image: "https://example.com/aot.jpg",
            desc: "Dubbed: 87 eps | Subbed: 87 eps | Rating: 9.1",
            episodes: 87
        },
        
        {
            id: 2,
            title: "Attack on Titan",
            image: "https://example.com/aot.jpg",
            desc: "Dubbed: 87 eps | Subbed: 87 eps | Rating: 9.1",
            episodes: 87
        },
        {
            id: 3,
            title: "Jujutsu Kaisen",
            image: "https://example.com/jjk.jpg",
            desc: "Dubbed: 24 eps | Subbed: 34 eps | Rating: 8.7",
            episodes: 34
        },
        {
            id: 4,
            title: "One Piece",
            image: "https://example.com/onepiece.jpg",
            desc: "Dubbed: 832 eps | Subbed: 1097 eps | Rating: 8.8",
            episodes: 1097
        },
        {
            id: 5,
            title: "Chainsaw Man",
            image: "https://example.com/chainsawman.jpg",
            desc: "Dubbed: 12 eps | Subbed: 12 eps | Rating: 8.6",
            episodes: 12
        }
    ];
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

export default Search
