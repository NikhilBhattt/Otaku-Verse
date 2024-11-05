import express from 'express';
import hls from 'hls-server';
import fs from 'fs';
import path from 'path';
import { createHLSStream } from '../utils/ffmpeg.js';

const router = express.Router();
const activeStreams = new Map();

// Start stream endpoint
router.post('/start-stream', async (req, res) => {
  try {
    const { streamId, inputFile } = req.body;
    
    // Check if stream already exists
    if (activeStreams.has(streamId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Stream ID already exists' 
      });
    }

    // Create stream directory
    const streamDir = path.join(process.cwd(), 'videos', streamId);
    if (!fs.existsSync(streamDir)) {
      fs.mkdirSync(streamDir, { recursive: true });
    }

    // Create and start the stream
    const command = await createHLSStream({ 
      inputFile, 
      streamId 
    });

    // Store stream reference
    activeStreams.set(streamId, command);

    res.json({
      success: true,
      streamId,
      playlistUrl: `/videos/${streamId}/playlist.m3u8`
    });

  } catch (error) {
    console.error('Stream creation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Stop a stream
router.post('/stop-stream/:streamId', (req, res) => {
  const { streamId } = req.params;
  const command = activeStreams.get(streamId);
  
  if (command) {
    command.kill('SIGKILL');
    activeStreams.delete(streamId);
    res.json({ success: true, message: 'Stream stopped' });
  } else {
    res.status(404).json({ success: false, message: 'Stream not found' });
  }
});

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Setup HLS Server
new hls(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split('.').pop();
      if (ext !== 'm3u8' && ext !== 'ts') {
        return cb(null, false);
      }

      const filePath = path.join(process.cwd(), 'videos', req.url);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        cb(null, !err);
      });
    },
    
    getManifest: (req, cb) => {
      const filePath = path.join(process.cwd(), 'videos', req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) return cb(err);
        cb(null, data);
      });
    },
    
    getSegment: (req, cb) => {
      const filePath = path.join(process.cwd(), 'videos', req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) return cb(err);
        cb(null, data);
      });
    }
  }
});

