import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const createHLSStream = ({ inputFile, streamId }) => {
  const streamDir = path.join(process.cwd(), 'videos', 'streams', streamId);
  
  if (!fs.existsSync(streamDir)) {
    fs.mkdirSync(streamDir, { recursive: true });
  }

  const outputOptions = [
    '-hls_list_size 0',
    '-hls_time 4',
    `-hls_segment_filename ${streamDir}/segment_%03d.ts`
  ];

  return new Promise((resolve, reject) => {
    const command = ffmpeg()
      .input(inputFile)
      .outputOptions(outputOptions)
      .output(`${streamDir}/playlist.m3u8`)
      .on('start', () => {
        console.log(`Stream ${streamId} started`);
      })
      .on('end', () => {
        console.log(`Stream ${streamId} ended`);
        resolve(command);
      })
      .on('error', (err) => {
        console.error(`Stream ${streamId} error:`, err);
        reject(err);
      });

    command.run();
    resolve(command); // Resolve immediately with command to allow control
  });
};

export { createHLSStream };
