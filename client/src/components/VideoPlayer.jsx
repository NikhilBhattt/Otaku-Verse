import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// Required for HLS playback
import 'videojs-contrib-quality-levels';
import '@videojs/http-streaming';
import '@videojs/themes/dist/city/index.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    console.log('Video source:', src);

    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: true
          }
        },
        controlBar: {
          playToggle: true,
          volumePanel: true,
          currentTimeDisplay: true,
          timeDivider: true,
          durationDisplay: true,
          progressControl: {
            seekBar: true
          },
          qualitySelector: true,
          fullscreenToggle: true,
          pictureInPictureToggle: true
        },
        sources: [{
          src: src,
          type: 'application/x-mpegURL' // HLS stream type
        }]
      }, function onPlayerReady() {
        console.log('Player is ready');
      });

      playerRef.current = player;

      // Handle quality levels if available
      playerRef.current.qualityLevels();
    }

    // Dispose the Video.js player when component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div data-vjs-player style={{ width: '60vw', height: '60vh', maxWidth: '800px', margin: '0 auto', backgroundColor: 'black'}}>
      <video 
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-theme-city"
      />
    </div>
  );
};

export default VideoPlayer;


