<h2 align="center">
  Soundtrack - Backend
</h2>

## :mortar_board: Technologies

- [Express.js](https://github.com/expressjs/express)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js#readme)
- [Json Web Token](https://github.com/auth0/node-jsonwebtoken#readme)
- [Multer](https://github.com/expressjs/multer)
- [Mongoose](https://mongoosejs.com/docs/guide.html)

## :computer: Configure

To run this application i recommend you to install [Docker](https://docs.docker.com/install/) and [configure](https://docs.docker.com/install/linux/linux-postinstall/) it to use with your user system. (If you needed).

First it all, let's configure the database.
MongoDB

```sh
$ docker run --name mongodb -p 27017:27017 -d mongo
```

Now, let's prepare the application

_Just for organizational purposes, let's create a folder called **soundtrack** and put our codes inside_

```sh
$ mkdir soundtrack
$ cd soundtrack
```

Cloning the repository

```sh
$ git clone https://github.com/juliosouzam/soundtrack-backend.git backend
$ cd backend
```

With [_yarn_](https://classic.yarnpkg.com/en/docs/install) installed run...

```sh
$ yarn
# and now
```

## :video_game: Running

```sh
# in the terminal
$ yarn dev
```

## Next Features

- Tests
- CI/CD

Developed by [me](https://github.com/juliosouzam) with :coffee: and :heart:
