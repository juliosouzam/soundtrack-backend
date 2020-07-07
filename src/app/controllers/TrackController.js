import fs from 'fs';
import { resolve } from 'path';

import storageConfig from '../../config/upload';

import Track from '../models/Track';

class TrackController {
  async index(request, response) {
    const tracks = await Track.find().populate('user', 'name');

    return response.json(tracks);
  }

  async store(request, response) {
    const {
      name = null,
      originalname,
      mimetype,
      size,
      filename,
    } = request.file;
    const user_id = request.userId;

    const track = await Track.create({
      name: name || originalname,
      originalname,
      mimetype,
      size,
      filename,
      user: user_id,
    });

    return response.json(track);
  }

  async show(request, response) {
    const { track_id } = request.params;

    const track = await Track.findById(track_id);

    if (!track) {
      return response.status(400).json({ error: 'Track not found' });
    }

    return response.json(track);
  }

  async update(request, response) {
    const { track_id } = request.params;
    const { name } = request.body;

    const track = await Track.findByIdAndUpdate(
      track_id,
      { name },
      {
        new: true,
      },
    );

    return response.json(track);
  }

  async destroy(request, response) {
    const { track_id } = request.params;

    const track = await Track.findById(track_id);

    if (!track) {
      return response.status(400).json({ error: 'Track not found' });
    }

    await fs.promises.unlink(resolve(storageConfig.dest, track.filename));

    await Track.findByIdAndDelete(track_id);

    return response.status(204).json();
  }
}

export default new TrackController();
