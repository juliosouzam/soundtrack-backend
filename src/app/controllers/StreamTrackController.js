import fs from 'fs';
import { resolve } from 'path';

import storageConfig from '../../config/upload';

import Track from '../models/Track';

class StreamTrackController {
  // eslint-disable-next-line consistent-return
  async show(request, response) {
    const { track_id } = request.params;

    const track = await Track.findById(track_id);

    if (!track) {
      return response.status(400).json({ error: 'Track not found' });
    }

    const filePath = resolve(storageConfig.dest, track.filename);

    const streamTrack = await fs.promises.stat(
      resolve(storageConfig.dest, track.filename),
    );

    response.writeHead(200, {
      'Content-Type': track.mimetype,
      'Content-Length': streamTrack.size,
    });

    const highWaterMark = 128;

    const stream = fs.createReadStream(filePath, { highWaterMark });

    // eslint-disable-next-line no-console
    stream.on('end', () => console.log('acabou'));

    stream.pipe(response);
  }
}

export default new StreamTrackController();
