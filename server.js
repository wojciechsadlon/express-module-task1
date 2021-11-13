const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  res.userCheck = () => {
    return false
  };
  res.show = (name) => {
    res.sendFile(path.join(__dirname,  `/views/${name}`));
  };
  next();
});

app.get(('/'), (req, res) => {
  res.show('index.html')
});

app.get('/about', (req, res) => {
  res.show('about.html')
});

app.get('/user/settings', (req, res) => {
  if(res.userCheck()) res.show('/user/settings.html');
  else res.send('<h1>You need to be logged in!</h1>')
});

app.get('/user/panel', (req, res) => {
  if(res.userCheck()) res.show('/user/settings.html');
  else res.send('<h1>You need to be logged in!</h1>')
});

app.use((req, res) => {
  res.status(404).show('404.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
