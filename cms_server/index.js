const express = require('express');
const database = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors');

const { getAllContents, createContent, updateContent, deleteContent } = require('./controllers/contentController');

// Load environment variables
dotenv.config();

// Connect to database
database.connect();

// Create an express app
app = express();

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(cors()); // Enable All CORS Requests (cors used for cross origin resource sharing)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/content', getAllContents);
app.post('/content', createContent);
app.put('/content/:id', updateContent);
app.delete('/content/:id', deleteContent);

app.get('/user', (req, res) => {
  res.send('User');
});
