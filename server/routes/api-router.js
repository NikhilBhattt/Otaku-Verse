const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploads
const { createHLSStream } = require('../utils/ffmpeg'); // Import the createHLSStream function
const { uploadFolderToMega } = require('../utils/drive'); // Import the uploadFolderToMega function
const path = require('path');

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Access the uploaded file
    const uploadedFile = req.file;
    console.log('File uploaded:', uploadedFile);

    try {
        // Create HLS stream from the uploaded file
        const streamId = Date.now().toString(); // Generate a unique stream ID
        const streamDir = path.join(process.cwd(), 'videos', 'streams', streamId);
        await createHLSStream({ inputFile: uploadedFile.path, streamId });

        // Upload the HLS stream folder to Mega
        const megaLink = await uploadFolderToMega(streamDir);
        console.log('HLS stream uploaded to Mega:', megaLink);

        res.status(200).json({ message: 'File uploaded, HLS stream created, and uploaded to Mega successfully', streamId, megaLink });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Failed to process file' });
    }
});

module.exports = router;
