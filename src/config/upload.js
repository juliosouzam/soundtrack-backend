import { diskStorage } from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);

        const filename = res.toString('hex') + extname(file.originalname);

        return cb(null, filename);
      });
    },
  }),
};
