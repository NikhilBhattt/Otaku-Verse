import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import '@videojs/themes/dist/city/index.css';

import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: src,
        type: 'application/x-mpegURL'
      }],
      html5: {
        vhs: {
          overrideNative: true,
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          fastQualityChange: true,
        }
      },
      liveui: true, // Enable live UI elements
      liveTracker: {
        trackingThreshold: 0.5,
        liveTolerance: 15
      }
    };

    // Create player instance
    const player = videojs(videoRef.current, options, function onPlayerReady() {
      console.log('Player ready');
      
      // Attempt autoplay
      player.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    });

    // Error handling
    player.on('error', (error) => {
      console.error('Video.js error:', player.error());
    });

    // Quality level switching
    player.on('qualityLevelsChanged', () => {
      console.log('Quality level changed');
    });

    // Handle buffering states
    player.on('waiting', () => {
      console.log('Buffering...');
    });

    player.on('canplay', () => {
      console.log('Can play');
    });

    // Store player reference
    playerRef.current = player;

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]); // Recreate player when streamId changes

  return (
    <div className="video-container pl-4 pt-4 w-[46vw] rounded-sm aspect-video">
      <div data-vjs-player className="">
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-city "
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoPlayer;


