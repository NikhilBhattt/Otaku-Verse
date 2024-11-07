import express from 'express';
import multer from 'multer';
import path from 'path';
import { Anime, Episode } from '../models/anime.model.js'; // Import the Anime and Episode models
import { createHLSStream } from '../utils/ffmpeg.js';
import { uploadFolderToMega } from '../utils/drive.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploads

router.post('/upload', upload.single('file'), async (req, res) => {
    const { name, description, totalEpisodes } = req.body; // Extract additional fields from the request

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

        // Create a new episode entry
        const newEpisode = new Episode({
            episodeNumber: 1, // Assuming this is the first episode, adjust as needed
            streamId,
            title: uploadedFile.originalname,
            animeName: name,
            link: megaLink
        });

        await newEpisode.save();

        // Create or update the anime entry in the database
        const anime = await Anime.findOneAndUpdate(
            { name },
            {
                name,
                description,
                totalEpisodes,
                $push: { episodes: newEpisode._id }
            },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: 'File uploaded, HLS stream created, and uploaded to Mega successfully',
            streamId,
            megaLink,
            anime
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Failed to process file' });
    }
});


router.get('/getAnime', async (req, res) => {
    const { search } = req.query;
    const anime = await Anime.find({
        name: { $regex: search, $options: 'i' }  // Case-insensitive search for partial matches
    });
    res.status(200).json(anime);
});

router.get('/trending', async (req, res) => {
    console.log('Trending anime requested');
    const anime = await Anime.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(anime);
});

export default router;
