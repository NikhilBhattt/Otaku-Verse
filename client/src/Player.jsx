import React, { useEffect, useState } from 'react'
import axios from 'axios'
import player from './assets/svgs/player.svg'
import VideoPlayer from './components/VideoPlayer'

const Player = ({streamId}) => {
  const [streamUrl, setStreamUrl] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:3000/hls/start-stream', {
      streamId: streamId,
    })
    .then(response => {
      console.log(response);
      if (response.data.success) {
        setStreamUrl('http://localhost:3000'+response.data.streamUrl);
      }
    })
    .catch(error => {
      console.error('Error starting stream:', error);
    });

    return () => {
      axios.post(`http://localhost:3000/hls/stop-stream/${streamId}`)
        .catch(error => console.error('Error stopping stream:', error));
    };
  }, []);

  return (
    <div className='w-[65vw] h-[74vh] relative right-[2.5vw] bg-black'
      style={{
        maskImage: `url(${player})`,
        maskSize: 'cover',
        maskRepeat: 'no-repeat',
        WebkitMaskImage: `url(${player})`, 
        WebkitMaskSize: 'cover',
        WebkitMaskRepeat: 'no-repeat'
      }}
    >
      {streamUrl && <VideoPlayer src={streamUrl} />}
    </div>
  )
}

export default Player
