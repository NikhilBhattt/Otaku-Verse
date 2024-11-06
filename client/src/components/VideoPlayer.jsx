import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ streamId }) => {
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
        src: `http://localhost:5000/videos/streams/rj/playlist.m3u8`,
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
  }, [streamId]); // Recreate player when streamId changes

  return (
    <div className="video-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-city"
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoPlayer;


