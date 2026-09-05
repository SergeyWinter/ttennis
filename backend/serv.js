const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const testRoutes=require('./routes/testRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const videosRoutes = require('./routes/videosRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
app.use(express.json());

// тест API   //http://localhost:5001/api/test
// app.get('/api/test', (req, res) => { 
//   res.json({ message: 'API работает' });
// });
app.use('/api',testRoutes);
app.use('/api/homepage', homepageRoutes);// API временный для client   //http://localhost:5001/api/homepage
app.use('/api/videos', videosRoutes);

app.use('/image', express.static('media/image'));
app.use('/videos', express.static('media/videos'));
// подключение build
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log('serv works on ' + PORT);
});
