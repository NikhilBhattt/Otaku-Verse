import React from 'react'

const Anime = ({ title = "hellkjhgfghjknbvfdtyuiuytfbnmnbvftyuiouytrdbnmnbftyuiuytghbbgfyuiolouyufhgvmb,hjfyoil", image, desc="hellkjhgfghjknbvfdtyuiuytfbnmnbvftyuiouytrdbnmnbftyuiuytghbbgfyuiolouyufhgvmb,hjfyoil", episodes }) => {
    const limitWords = (text, limit) => {
        const words = text.split('');
        if (words.length > limit) {
            return words.slice(0, limit).join('') + '...';
        }
        return text;
    };
    return (
        <div className='flex  border-[1px] hover:scale-105 transition-all duration-300 border-gray-500 rounded-md'>
            <div className='w-[10vw] h-[10vw] bg-red-500 flex items-end justify-start p-2' style={{ backgroundImage: `url(${image})` }}>
                <p className='bg-purple-500 px-2 py-1 rounded-md'>{episodes}</p>
            </div>
            <div className='flex flex-col items-start justify-start w-[17vw] pl-2'
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)', 
                borderRadius: '0px 8px 8px 0px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
            
            >
                <h3 className='text-lg font-kaushan'>{limitWords(title, 16)}</h3>
                <p className='text-sm text-black'>{limitWords(desc, 100)}</p>
            </div>
        </div>
    )
}

export default Anime
