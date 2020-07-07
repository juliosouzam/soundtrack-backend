import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

class Application {
  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  database() {
    mongoose.connect(
      `${process.env.MONDO_URL || 'mongodb://localhost:27017/soundtrack'}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      },
    );
  }

  routes() {
    this.express.use(routes);
  }
}

export default new Application().express;
