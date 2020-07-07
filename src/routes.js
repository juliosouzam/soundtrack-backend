import { Router } from 'express';
import multer from 'multer';

import LoginController from './app/controllers/LoginController';
import RegisterController from './app/controllers/RegisterController';
import TrackController from './app/controllers/TrackController';

import StreamTrackController from './app/controllers/StreamTrackController';

import authenticated from './app/middlewares/authenticated';

import multerConfig from './config/upload';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (request, response) => {
  return response.json({
    status: 'Running',
  });
});

routes.post('/login', LoginController.store);
routes.post('/register', RegisterController.store);

routes.get('/stream/:track_id', StreamTrackController.show);

routes.use(authenticated);

routes.get('/tracks', TrackController.index);
routes.post('/tracks', upload.single('file'), TrackController.store);
routes.get('/tracks/:track_id', TrackController.show);
routes.put('/tracks/:track_id', TrackController.update);
routes.delete('/tracks/:track_id', TrackController.destroy);

export default routes;
