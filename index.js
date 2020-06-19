const app = require('express')();
const http = require('http').Server(app);
const data = require('./data');

const port = 3022;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/data', (req, res) => {
  res.send(data.data);
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});