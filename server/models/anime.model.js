import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  episodeNumber: { type: Number, required: true },
  streamId: { type: String, required: true },
  title: { type: String },
  duration: { type: Number },
  animeName: { type: String, required: true },
  thumbnail: { 
    data: Buffer,
    contentType: String
  },
  link: { type: String }
});

const animeSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  totalEpisodes: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  episodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode'
  }],
  thumbnail: {
    data: Buffer,
    contentType: String
  },
  genres: [{ type: String }],
  releaseYear: { type: Number },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed'],
    default: 'Ongoing'
  }
});

const Episode = mongoose.model('Episode', episodeSchema);
const Anime = mongoose.model('Anime', animeSchema);

export { Anime, Episode };

