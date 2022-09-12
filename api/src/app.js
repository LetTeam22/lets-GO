const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { createServer } = require("http");
const { Server } = require("socket.io");

require('./db.js');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on("connection", (socket) => {

  socket.on('disconnect', () => {
    console.log('Alguien se ha desconectado!')
  })
});

httpServer.listen(5000);

app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  // res.header('Access-Control-Allow-Origin', 'https://pf-let.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// app.use(
//   require("cors")({
//   origin: function (origin, callback) {
//   callback(null, origin);
//   },
//   credentials: true
//   })
// );

const cors = require('cors');
// Habilito todas las solicitudes CORS
app.use(cors({ origin: '*' }));

// Habilito CORS para una ruta en particular
app.get('https://pf-let.vercel.app', cors(),  (req, res, next) => {
    res.sendStatus(200)
})

app.use('/', routes);

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
