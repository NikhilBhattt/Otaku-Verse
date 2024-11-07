import express from 'express';
import hls from 'hls-server';
import fs from 'fs';
import path from 'path';
import { createHLSStream } from '../utils/ffmpeg.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { downloadFolderFromMega } from '../utils/drive.js';

const router = express.Router();
const activeStreams = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start stream endpoint
router.post('/start-stream', async (req, res) => {
  try {
    const { streamId } = req.body;

    // Define the path to the playlist file
    const playlistPath = path.join(process.cwd(), 'videos', 'streams', streamId, 'playlist.m3u8');

    // Check if the playlist file already exists
    if (fs.existsSync(playlistPath)) {
      return res.json({
        success: true,
        streamId,
        playlistUrl: `/videos/streams/${streamId}/playlist.m3u8`
      });
    }

    // Check if stream already exists
    if (activeStreams.has(streamId)) {
      activeStreams.get(streamId).kill('SIGKILL');
      activeStreams.delete(streamId);
    }

    // Create stream directory
    const streamDir = path.join(process.cwd(), 'videos', 'streams', streamId);
    if (!fs.existsSync(streamDir)) {
      fs.mkdirSync(streamDir, { recursive: true });
    }

    // Download file from Mega
    const megaFileUrl = req.body.megaFileUrl;
    await downloadFolderFromMega(megaFileUrl, streamDir);

    res.json({
      success: true,
      streamId,
      playlistUrl: `/videos/streams/${streamId}/playlist.m3u8`
    });

  } catch (error) {
    console.error('Stream creation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});


export default router;

