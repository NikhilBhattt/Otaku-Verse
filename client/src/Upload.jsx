import React, { useState } from 'react';
import upload from './assets/svgs/upload.svg'

const Upload = () => {
  const [formData, setFormData] = useState({
    animeName: '',
    episodeName: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can add further logic to handle form submission, like sending data to a server
  };

  return (
    <div
      style={{
        width: '60vw',
        height: '66vh',
        padding: '16px', // 4 * 4px = 16px
        backgroundColor: '#ffffff', 
        borderRadius: '8px', // Rounded corners
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        boxSizing: 'border-box',
        maskImage: `url(${upload})`,
        maskSize: 'cover',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${upload})`, // For WebKit browsers
        WebkitMaskSize: 'cover',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    >
      <form onSubmit={handleSubmit} style={{
        width: '30%',
        height: '70%', // Set form height to 70%
        backgroundColor: '#EDE7F6', // Purple-30
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
            value={formData.animeName}
            onChange={handleChange}
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
            value={formData.episodeName}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
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
          backgroundColor: '#5E35B1', // Darker purple for button
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
        }}>Submit</button>
      </form>
    </div>
  );
}

export default Upload;
