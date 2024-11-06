import { google } from 'googleapis';
import fs from 'fs';
import stream from 'stream';
import { promisify } from 'util';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import express from 'express';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const CHUNK_SIZE = 16 * 1024 * 1024; // 16MB chunks

// Create auth client
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: SCOPES
});

const drive = google.drive({ version: 'v3', auth });
const pipeline = promisify(stream.pipeline);

// Setup express router for HLS streaming
const router = express.Router();

const convertToHLS = async (inputPath, outputDir, socket) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-hls_time 10',        // 10 second segments
        '-hls_list_size 0',    // Keep all segments
        '-hls_segment_type mpegts',
        '-hls_segment_filename', path.join(outputDir, 'segment%d.ts')
      ])
      .output(path.join(outputDir, 'playlist.m3u8'))
      .on('progress', (progress) => {
        if(socket) {
          socket.emit('conversionProgress', {
            progress: progress.percent,
            timemark: progress.timemark
          });
        }
      })
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run();
  });
};

const downloadAndProcessFile = async (fileId, tempDir, socket) => {
  try {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const { data: file } = await drive.files.get({
      fileId,
      fields: 'size,name'
    });

    const fileSize = parseInt(file.size);
    const ranges = [];
    const chunkFiles = [];
    
    for (let i = 0; i < fileSize; i += CHUNK_SIZE) {
      const end = Math.min(i + CHUNK_SIZE - 1, fileSize - 1);
      ranges.push({ start: i, end });
    }

    // Notify total chunks to frontend
    if(socket) {
      socket.emit('totalChunks', ranges.length);
    }

    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const chunkPath = path.join(tempDir, `chunk_${i}.mp4`);
      chunkFiles.push(chunkPath);

      // Download chunk
      const res = await drive.files.get({
        fileId,
        alt: 'media',
        headers: {
          Range: `bytes=${range.start}-${range.end}`
        }
      }, {
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(chunkPath);
      await pipeline(res.data, writer);

      // Notify chunk download complete
      if(socket) {
        socket.emit('chunkDownloaded', i + 1);
      }

      // Convert chunk to HLS
      const hlsOutputDir = path.join(tempDir, `hls_${i}`);
      if (!fs.existsSync(hlsOutputDir)) {
        fs.mkdirSync(hlsOutputDir, { recursive: true });
      }
      
      await convertToHLS(chunkPath, hlsOutputDir, socket);

      // Make HLS segments available via HTTP
      router.get(`/stream/hls_${i}/:file`, (req, res) => {
        const filePath = path.join(hlsOutputDir, req.params.file);
        res.sendFile(filePath);
      });

      // Notify HLS conversion complete for this chunk
      if(socket) {
        socket.emit('chunkConverted', i + 1);
      }
    }

    // Create and serve master playlist
    const masterPlaylist = ranges.map((_, i) => 
      `#EXTINF:-1,\n/stream/hls_${i}/playlist.m3u8`
    ).join('\n');

    const masterPlaylistPath = path.join(tempDir, 'master.m3u8');
    fs.writeFileSync(
      masterPlaylistPath,
      '#EXTM3U\n' + masterPlaylist
    );

    router.get('/stream/master.m3u8', (req, res) => {
      res.sendFile(masterPlaylistPath);
    });

    // Cleanup temporary chunk files
    chunkFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    // Notify frontend that processing is complete
    if(socket) {
      socket.emit('processingComplete', {
        masterPlaylistUrl: '/stream/master.m3u8'
      });
    }

    return {
      masterPlaylist: '/stream/master.m3u8',
      hlsSegments: ranges.map((_, i) => `/stream/hls_${i}`),
      router
    };

  } catch (error) {
    console.error('Error processing file:', error);
    if(socket) {
      socket.emit('error', error.message);
    }
    throw error;
  }
};


export { downloadAndProcessFile, setupSocketIO, router };


