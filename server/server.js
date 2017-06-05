import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import s3Router from './s3';

const app = express();
const port = process.env.PORT || 5000;

// Process application/json
app.use(bodyParser.json({
  extended: true,
}));

// CORS
app.use(cors());

// API Routes
app.use('/quests', require('./quests/routes'));
app.use('/users', require('./users/routes'));
app.use('/s3', s3Router({
  bucket: 'hey.community/videos',
  ACL: 'public-read'
}))

// Start Server
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
