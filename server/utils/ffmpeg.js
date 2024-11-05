const ffmpeg = require('fluent-ffmpeg');

const createHLSStream = (inputFile) => {
  const outputOptions = [
    '-hls_list_size 10', 
    '-hls_time 4',
    '-hls_segment_filename ./videos/segment_%03d.ts'
  ];

  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .setFormat('hls')
      .setOutputOptions(outputOptions)
      .on('end', () => {
        console.log('HLS stream created');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error creating HLS stream:', err);
        reject(err);
      })
      .run();
  });
};

module.exports = {
  createHLSStream
};




