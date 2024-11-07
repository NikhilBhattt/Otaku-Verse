import React, { useState } from 'react';
import axios from 'axios';
import upload from './assets/svgs/upload.svg';

const Upload = () => {
  const [activeForm, setActiveForm] = useState('createAnime');
  const [animeData, setAnimeData] = useState({
    animeName: '',
    description: ''
  });
  const [episodeData, setEpisodeData] = useState({
    animeName: '',
    episodeName: '',
    videoFile: null
  });

  const handleAnimeChange = (e) => {
    const { name, value } = e.target;
    setAnimeData({
      ...animeData,
      [name]: value
    });
  };

  const handleEpisodeChange = (e) => {
    const { name, value } = e.target;
    setEpisodeData({
      ...episodeData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setEpisodeData({
      ...episodeData,
      videoFile: e.target.files[0]
    });
  };

  const handleAnimeSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/createAnime', animeData)
      .then(response => {
        console.log('Anime created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating anime:', error);
      });
  };

  const handleEpisodeSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('animeName', episodeData.animeName);
    data.append('episodeName', episodeData.episodeName);
    data.append('videoFile', episodeData.videoFile);

    axios.post('http://localhost:3000/api/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Video uploaded successfully:', response.data);
    })
    .catch(error => {
      console.error('Error uploading video:', error);
    });
  };

  return (
    <div
      style={{
        width: '60vw',
        height: 'auto',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        boxSizing: 'border-box',
        maskImage: `url(${upload})`,
        maskSize: 'cover',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${upload})`,
        WebkitMaskSize: 'cover',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    >
      <button onClick={() => setActiveForm('createAnime')}>Create Anime</button>
      <button onClick={() => setActiveForm('uploadEpisode')}>Upload Episode</button>
      {activeForm === 'createAnime' ? (
        <form onSubmit={handleAnimeSubmit} style={{
          width: '30%',
          height: '70%',
          backgroundColor: '#EDE7F6',
          borderRadius: '8px',
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="animeName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5E35B1', fontSize: '14px' }}>Anime Name:</label>
            <input
              type="text"
              id="animeName"
              name="animeName"
              value={animeData.animeName}
              onChange={handleAnimeChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5E35B1', fontSize: '14px' }}>Description:</label>
            <textarea
              id="description"
              name="description"
              value={animeData.description}
              onChange={handleAnimeChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontSize: '14px',
              }}
            />
          </div>
          <button type="submit" style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#5E35B1',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
          }}>Submit</button>
        </form>
      ) : (
        <form onSubmit={handleEpisodeSubmit} style={{
          width: '30%',
          height: '70%',
          backgroundColor: '#EDE7F6',
          borderRadius: '8px',
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="animeName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5E35B1', fontSize: '14px' }}>Anime Name:</label>
            <input
              type="text"
              id="animeName"
              name="animeName"
              value={episodeData.animeName}
              onChange={handleEpisodeChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="episodeName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5E35B1', fontSize: '14px' }}>Episode Name:</label>
            <input
              type="text"
              id="episodeName"
              name="episodeName"
              value={episodeData.episodeName}
              onChange={handleEpisodeChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="videoFile" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5E35B1', fontSize: '14px' }}>Video File:</label>
            <input
              type="file"
              id="videoFile"
              name="videoFile"
              onChange={handleFileChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
          </div>
          <button type="submit" style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#5E35B1',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
          }}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default Upload;
