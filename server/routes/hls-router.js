import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { downloadFolderFromMega } from '../utils/drive.js';
import { Anime } from '../models/anime.model.js';

const router = express.Router();
const activeStreams = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start stream endpoint
router.post('/start-stream', async (req, res) => {
  console.log('this is hls router');
  try {
    const { animeName } = req.body; // Expect animeName in the request

    const anime = await Anime.findOne({ name: animeName }).populate('episodes');
    if (!anime || anime.episodes.length === 0) {
      return res.status(404).json({ success: false, message: 'Anime or episodes not found' });
    }

    const { streamId, link }= anime.episodes[0]
    
    const playlistPath = path.join(process.cwd(), 'videos', 'streams', streamId, 'playlist.m3u8');

    // Check if the playlist file already exists
    if (fs.existsSync(playlistPath)) {
      return res.status(200).json({
        success: true,
        streamId,
        streamUrl: `/videos/streams/${streamId}/playlist.m3u8`,
        
      });
    }
    // Find the anime in the database
    console.log(anime.episodes);
    // Use the first episode's link
    const megaFileUrl = link;
    
    // Define the path to the playlist file
    
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
    console.log('downloading file from mega');
    // Download file from Mega
    await downloadFolderFromMega(megaFileUrl, streamDir);

    console.log('file downloaded');
    res.json({
      success: true,
      streamId,
      playlistUrl: `/videos/streams/${streamId}/playlist.m3u8`,
      episodes: anime.episodes,
      totalEpisodes: anime.episodes.length
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

